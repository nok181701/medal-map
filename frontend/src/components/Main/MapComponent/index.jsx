import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HashLoader } from "react-spinners";
import CircleAndMaker from "src/components/Main/MapComponent/CircleAndMaker";
import "src/styles/Main/MapComponent/MapComponent.css";
import dummyData from "src/dummyData.json";
import haversineDistance from "haversine-distance";

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
    }, 500);
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
    const radiusInMeters = 1000;

    const placesInRadius = dummyData.filter((place) => {
      const placeCoordinates = { latitude: place.lat, longitude: place.lng };
      const distance = haversineDistance(centerCoordinates, placeCoordinates);

      return distance <= radiusInMeters;
    });
    return placesInRadius;
  }, []);

  useEffect(() => {
    // 初回描画時や currentPosition が変更されたときに検索を行う
    const performSearch = async () => {
      try {
        setIsLoading(true);

        const places = await searchNearbyPlaces(
          currentPosition || defaultPosition
        );
        const newMarkers = places.map((place) => ({
          position: { lat: place.lat, lng: place.lng },
          name: place.name,
        }));
        setMarkers(newMarkers);
      } catch (error) {
        console.error("Error searching nearby places:", error);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [currentPosition, defaultPosition, searchNearbyPlaces]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div style={containerStyle}>
        {isLoading && (
          <div className="loadingOverlay">
            <HashLoader color="#60A5FA" width={8} />
            <p className="p-2 ml-2 font-bold">Loading...</p>
          </div>
        )}
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
