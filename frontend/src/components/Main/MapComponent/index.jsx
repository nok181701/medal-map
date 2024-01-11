import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useCallback, useMemo, useRef, useState } from "react";
import { HashLoader } from "react-spinners";
import CircleAndMaker from "src/components/Main/MapComponent/CircleAndMaker";
import "src/styles/Main/MapComponent/MapComponent.css";

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
  const defaultPosition = useMemo(() => ({ lat: 35.6812, lng: 139.7671 }), []);
  const mapRef = useRef(null);

  const handleLoad = (map) => {
    mapRef.current = map;
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
