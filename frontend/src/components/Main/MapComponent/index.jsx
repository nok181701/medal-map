import React from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import CircleAndMaker from "src/components/Main/MapComponent/CircleAndMaker";
import LoadingOverlay from "src/utils/Loading";
import useMapComponentLogic from "src/hooks/Map/useMapComponentLogic";

const MapComponent = () => {
  const {
    currentPosition,
    isLoading,
    markers,
    defaultPosition,
    handleLoad,
    handleCenterChanged,
    getCurrentLocation,
  } = useMapComponentLogic();

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "15px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {isLoading && <LoadingOverlay />}
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "400px",
            borderRadius: "15px",
            overflow: "hidden",
            position: "relative",
          }}
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
              icon={{
                url: process.env.REACT_APP_PUBLIC_URL + "/medal-pin.png",
              }}
              className="custom-marker"
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
