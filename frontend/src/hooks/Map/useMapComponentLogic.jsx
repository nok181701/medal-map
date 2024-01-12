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

  const handleLoad = (map) => {
    mapRef.current = map;
    if (!mapCenter && map) {
      setMapCenter(map.getCenter().toJSON());
    }
  };

  const handleCenterChanged = useCallback(() => {
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
    }, 500);
  }, [setCurrentPosition, currentPosition]);

  const getCurrentLocation = useCallback(async () => {
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

    return () => {
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
    handleLoad,
    handleCenterChanged,
    getCurrentLocation,
  };
};

export default useMapComponentLogic;
