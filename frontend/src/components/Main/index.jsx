import MapComponent from "src/components/Main/MapComponent";
import ShopsComponent from "src/components/Main/ShopsComponent";

const Main = () => {
  return (
    <>
      <main>
        <div className="bg-contentsBg p-4 ">
          <section className=" mb-5">
            <h2>マップから検索</h2>
            <hr className="border-t-2 border-blue-400" />
            <div className="m-3">
              <MapComponent />
            </div>
          </section>

          <section>
            <h2>店舗一覧</h2>
            <hr className="border-t-2 border-blue-400" />
            <div className="m-3">
              <ShopsComponent />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Main;
