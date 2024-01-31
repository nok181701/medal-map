import MapComponent from "src/components/Main/MapComponent";
import ShopsComponent from "src/components/Main/ShopsComponent";
import useMapComponentLogic from "src/hooks/Map/useMapComponentLogic";

const Main = () => {
  const imgUrl = process.env.REACT_APP_PUBLIC_URL;
  const {
    currentPosition,
    isLoading,
    markers,
    defaultPosition,
    searchQuery,
    searchResult,
    showNoResultsModal,
    selectedMarker,
    setSelectedMarker,
    handleLoad,
    handleCenterChanged,
    getCurrentLocation,
    setSearchQuery,
    handleSearch,
    handleCloseModal,
  } = useMapComponentLogic();
  return (
    <>
      <main>
        <div className="bg-contentsBg p-4 dark:bg-gray-700 transition-colors duration-300 ease-in-out">
          <section className=" mb-5">
            <div className="flex items-center">
              <img src="/mark.png" alt="" className="w-8" />
              <h2 className="dark:text-white">
                メダルゲームを検索（関東圏のみ）
              </h2>
            </div>
            <hr className="border-t-2 border-blue-400" />
            <div className="m-3">
              <MapComponent
                currentPosition={currentPosition}
                isLoading={isLoading}
                markers={markers}
                defaultPosition={defaultPosition}
                searchQuery={searchQuery}
                searchResult={searchResult}
                showNoResultsModal={showNoResultsModal}
                setSelectedMarker={setSelectedMarker}
                handleLoad={handleLoad}
                handleCenterChanged={handleCenterChanged}
                getCurrentLocation={getCurrentLocation}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                handleCloseModal={handleCloseModal}
              />
            </div>
          </section>

          <section>
            <div className="flex items-center">
              <img
                src={
                  process.env.REACT_APP_PUBLIC_URL === "development"
                    ? `${imgUrl}/mark.png`
                    : "/mark.png"
                }
                alt=""
                className="w-8"
              />
              <h2 className="dark:text-white">
                店舗一覧
                <span className="text-2xl pl-2 dark:text-white">
                  {markers.length}
                </span>
                件
              </h2>
            </div>
            <hr className="border-t-2 border-blue-400" />
            <div className="m-3">
              <ShopsComponent
                markers={markers}
                selectedMarker={selectedMarker}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Main;
