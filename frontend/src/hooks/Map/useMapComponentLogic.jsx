import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dummyData from "src/dummyData.json";
import haversineDistance from "haversine-distance";

const useMapComponentLogic = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(null);
  const [markers, setMarkers] = useState([]);
  const defaultPosition = useMemo(() => ({ lat: 35.6812, lng: 139.7671 }), []);
  const mapRef = useRef(null);
  const isMounted = useRef(true);
  const prevZoomRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);

  const handleLoad = (map) => {
    mapRef.current = map;
    if (!mapCenter && map) {
      setMapCenter(map.getCenter().toJSON());
    }
  };

  const handleCenterChanged = useCallback(() => {
    //スクロールにより中心座標が変化した時、再びピンとサークルを中心座標に移動する。
    if (!mapRef.current) return;

    if (handleCenterChanged.timer) {
      clearTimeout(handleCenterChanged.timer);
    }

    handleCenterChanged.timer = setTimeout(() => {
      const newPos = mapRef.current.getCenter().toJSON();

      if (
        currentPosition &&
        newPos.lat === currentPosition.lat &&
        newPos.lng === currentPosition.lng
      ) {
        return;
      }

      const currentZoom = mapRef.current.getZoom();
      const prevZoom = prevZoomRef.current;
      prevZoomRef.current = currentZoom;
      if (currentZoom !== prevZoom) {
        // ズームインとズームアウトの場合は処理をスキップ
        return;
      }
      setCurrentPosition(newPos);
    }, 500); //中心座標が1度でも変わると関数が実行されるので時間設定を設ける
  }, [setCurrentPosition, currentPosition]);

  const getCurrentLocation = useCallback(async () => {
    //現在地の取得
    try {
      setIsLoading(true);
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (e) {
      console.log(`取得できませんでした`);
      setCurrentPosition(defaultPosition);
    } finally {
      setIsLoading(false);
    }
  }, [defaultPosition]);

  const searchNearbyPlaces = useCallback(async (location) => {
    //2地点間(サークルの中心座標とその範囲内の店舗)の計算
    const centerCoordinates = {
      latitude: location.lat,
      longitude: location.lng,
    };
    const radiusInMeters = 1000;

    const placesInRadius = dummyData.filter((place) => {
      const placeCoordinates = { latitude: place.lat, longitude: place.lng };
      const distance = haversineDistance(centerCoordinates, placeCoordinates);

      return distance <= radiusInMeters;
    });
    return placesInRadius;
  }, []);

  const performSearch = useCallback(async () => {
    try {
      // setIsLoading(true);今は不要かも

      const places = await searchNearbyPlaces(
        currentPosition || defaultPosition
      );
      const newMarkers = places.map((place) => ({
        position: { lat: place.lat, lng: place.lng },
        name: place.name,
        address: place.address,
        nearestStation: place.nearestStation,
        businessHours: place.businessHours,
      }));

      if (isMounted.current) {
        setMarkers(newMarkers);
      }
    } catch (error) {
      console.error("Error searching nearby places:", error);
    } finally {
      if (isMounted.current) {
        // setIsLoading(false);
      }
    }
  }, [currentPosition, defaultPosition, searchNearbyPlaces]);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Geocoding request failed");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const resultLocation = data.results[0].geometry.location;
        setSearchResult(resultLocation);

        // 検索結果の位置に地図を移動
        setCurrentPosition({
          lat: resultLocation.lat,
          lng: resultLocation.lng,
        });
        setSearchQuery("");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setShowNoResultsModal(true);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleCloseModal = () => {
    setShowNoResultsModal(false);
  };

  useEffect(() => {
    isMounted.current = true;

    const fetchData = async () => {
      await performSearch();
    };

    fetchData();

    return () => {
      //アンマウント時にはisMounted.currentをfalseにして不要な更新を避ける
      isMounted.current = false;
    };
  }, [performSearch]);

  return {
    currentPosition,
    isLoading,
    mapCenter,
    markers,
    defaultPosition,
    mapRef,
    isMounted,
    searchQuery,
    searchResult,
    showNoResultsModal,
    handleCloseModal,
    setSearchQuery,
    handleLoad,
    handleCenterChanged,
    getCurrentLocation,
    setSearchResult,
    handleSearch,
  };
};

export default useMapComponentLogic;
