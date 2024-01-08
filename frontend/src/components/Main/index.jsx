import { FaRegMap } from "react-icons/fa";
import MapComponent from "src/components/Main/MapComponent/MapComponent";

const Main = () => {
  return (
    <>
      <main>
        <div className="bg-contentsBg p-4 ">
          <section className=" mb-5">
            <div className="flex items-center">
              <FaRegMap />
              <h2 className="pl-2">マップから検索</h2>
            </div>
            <hr className="border-t-2 border-blue-400" />
            <div className="m-3">
              <MapComponent />
            </div>
            <p>This is the content of the first main section.</p>
          </section>

          <section>
            <h2>Main Section 2</h2>
            <p>This is the content of the second main section.</p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Main;
