import "src/styles/Main/MapComponent/MapComponent.css";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CircleAndMaker from "src/components/Main/MapComponent/CircleAndMaker";
import dummyData from "src/dummyData.json";
import haversineDistance from "haversine-distance";
import LoadingOverlay from "src/utils/Loading";

const MapComponent = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "15px",
    overflow: "hidden",
    position: "relative",
  };

  const [currentPosition, setCurrentPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(null);
  const [markers, setMarkers] = useState([]);
  const defaultPosition = useMemo(() => ({ lat: 35.6812, lng: 139.7671 }), []);
  const mapRef = useRef(null);
  const isMounted = useRef(true);

  const handleLoad = (map) => {
    mapRef.current = map;
    if (!mapCenter && map) {
      //ローディング時にサークル中心の緯度経度を取得
      setMapCenter(map.getCenter().toJSON());
    }
  };

  const handleCenterChanged = useCallback(() => {
    //マップ上の中心座標が変更したときにピンとサークルを再び中心座標に移動させる
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
      setCurrentPosition(newPos);
    }, 500); //onCenterChangedにより中心座標が一度でも変わると関数が実行されてしまうため、ある程度時間を設ける
  }, [setCurrentPosition, currentPosition]);

  const getCurrentLocation = useCallback(async () => {
    //現在位置の取得
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
    //経度緯度の２点間の距離を求める
    const centerCoordinates = {
      latitude: location.lat,
      longitude: location.lng,
    };
    const radiusInMeters = 1000; //半径１キロで設定

    const placesInRadius = dummyData.filter((place) => {
      const placeCoordinates = { latitude: place.lat, longitude: place.lng };
      const distance = haversineDistance(centerCoordinates, placeCoordinates);

      return distance <= radiusInMeters;
    });
    return placesInRadius;
  }, []);

  const performSearch = useCallback(async () => {
    try {
      setIsLoading(true);

      const places = await searchNearbyPlaces(
        currentPosition || defaultPosition
      );
      const newMarkers = places.map((place) => ({
        position: { lat: place.lat, lng: place.lng },
        name: place.name,
      }));

      if (isMounted.current) {
        setMarkers(newMarkers);
      }
    } catch (error) {
      console.error("Error searching nearby places:", error);
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [currentPosition, defaultPosition, searchNearbyPlaces]);

  useEffect(() => {
    isMounted.current = true;

    const fetchData = async () => {
      await performSearch();
    };

    fetchData();
    // コンポーネントがアンマウントされたらisMountedをfalseにしてperformSearch中の不要な更新を避ける
    return () => {
      isMounted.current = false;
    };
  }, [performSearch]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div style={containerStyle}>
        {isLoading && <LoadingOverlay />}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition || defaultPosition}
          onLoad={(map) => handleLoad(map)}
          onCenterChanged={handleCenterChanged}
          zoom={14}
        >
          {currentPosition ? (
            <CircleAndMaker currentPosition={currentPosition} />
          ) : (
            <CircleAndMaker defaultPosition={defaultPosition} />
          )}
          {markers.map((marker, index) => (
            <MarkerF
              key={index}
              position={marker.position}
              title={marker.name}
            />
          ))}
        </GoogleMap>
        <button
          onClick={getCurrentLocation}
          className="getCurrentLocationButton"
        >
          現在地に移動する
        </button>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
