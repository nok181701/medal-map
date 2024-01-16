import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import CircleAndMaker from "src/components/Main/MapComponent/CircleAndMaker";
import LoadingOverlay from "src/utils/Loading";

const MapComponent = (props) => {
  const {
    currentPosition,
    isLoading,
    markers,
    defaultPosition,
    handleLoad,
    handleCenterChanged,
    getCurrentLocation,
    handleSearch,
    searchQuery,
    setSearchQuery,
    showNoResultsModal,
    handleCloseModal,
  } = props;

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="flex space-x-2 xl:w-1/4 mb-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="地名からでも検索できます"
          className="p-1.5 border border-gray-300 rounded flex-1 text-base" // パディングを p-1.5 に変更
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded cursor-pointer"
        >
          検索
        </button>
      </div>

      <div
        style={{
          width: "100%",
          height: window.innerWidth < 600 ? "330px" : "400px", //
          borderRadius: "15px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {isLoading && <LoadingOverlay />}
        <GoogleMap
          options={{
            mapTypeControl: false,
            fullscreenControl: false,
            gestureHandling: "greedy",
          }}
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
      {showNoResultsModal && (
        <div className="fixed inset-x-0 top-0 z-50 flex items-start justify-center p-4 transition-slide">
          <div className="bg-white p-8 rounded-lg shadow-2xl z-10">
            <p className="text-xl mb-4">該当の地域が見つかりません</p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-400 focus:outline-none focus:shadow-outline-blue"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </LoadScript>
  );
};

export default MapComponent;
