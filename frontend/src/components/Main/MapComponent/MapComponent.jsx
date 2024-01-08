import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";

const MapComponent = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "15px",
    overflow: "hidden",
  };

  const [currentPosition, setCurrentPosition] = useState(null);
  const storedPosition = JSON.parse(localStorage.getItem("currentPosition"));

  const defaultPosition = useMemo(
    () => storedPosition || { lat: 35.6895, lng: 139.6917 },
    [storedPosition]
  );

  const getCurrentLocation = useCallback(async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      localStorage.setItem(
        "currentPosition",
        JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );

      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (e) {
      console.log(`取得できませんでした`);
      setCurrentPosition(defaultPosition);
    }
  }, [defaultPosition]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div style={containerStyle}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition || defaultPosition}
          zoom={17}
        >
          {currentPosition && <Marker position={currentPosition} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
