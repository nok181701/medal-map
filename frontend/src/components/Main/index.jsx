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
    handleLoad,
    handleCenterChanged,
    getCurrentLocation,
    setSearchQuery,
    handleSearch,
  } = useMapComponentLogic();
  return (
    <>
      <main>
        <div className="bg-contentsBg p-4 ">
          <section className=" mb-5">
            <div className="flex items-center">
              <img src="/mark.png" alt="" className="w-8" />
              <h2>メダルゲームを検索</h2>
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
                handleLoad={handleLoad}
                handleCenterChanged={handleCenterChanged}
                getCurrentLocation={getCurrentLocation}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
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
              <h2>店舗一覧</h2>
            </div>
            <hr className="border-t-2 border-blue-400" />
            <div className="m-3">
              <ShopsComponent markers={markers} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Main;
