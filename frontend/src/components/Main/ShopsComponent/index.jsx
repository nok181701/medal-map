import React, { useEffect, useRef } from "react";
import ScrollToTopButton from "src/components/Main/ShopsComponent/ScrollToTopButton";

const ShopsComponent = (props) => {
  const imgUrl = process.env.REACT_APP_PUBLIC_URL;
  const { markers, selectedMarker } = props;
  const selectedMarkerRef = useRef(null);

  useEffect(() => {
    // 選択されたマーカーが変更されたときに、選択された店舗情報が表示されるようにスクロール
    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedMarker]);

  return (
    <>
      <div className="flex flex-col grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {markers.length !== 0 ? (
          markers.map((marker, index) => (
            <div
              key={index}
              ref={marker === selectedMarker ? selectedMarkerRef : null} // 選択されたマーカーに対応する場合、Refを設定
              className={`flex flex-col md:flex-row bg-white p-4 rounded-lg shadow-md  dark:bg-gray-800 transition-colors duration-300 ease-in-out ${
                marker === selectedMarker ? "border-2 border-blue-500" : ""
              }`}
            >
              <div className="mb-4 md:mb-0 md:mr-4 flex ">
                <img
                  src={
                    marker.image !== null
                      ? marker.image
                      : `${imgUrl}/no-pictures.png` || "/no-pictures.png"
                  }
                  className="w-48 h-48 object-cover m-auto rounded"
                  alt=""
                />
              </div>
              <hr />
              <div>
                <h3 className="text-lg mt-2 dark:text-white">{marker.name}</h3>
                <ul className="p-2">
                  <li className="dark:text-white">
                    住所：{marker.address ? marker.address : "なし"}
                  </li>
                  <li className="dark:text-white">
                    電話：{marker.phone_number ? marker.phone_number : "なし"}
                  </li>
                  <li className="dark:text-white">
                    メダルゲーム：
                    <ul>
                      {marker.medal_machine_name.map((machineName, index) =>
                        machineName !== null ? (
                          <li
                            key={index}
                            className="inline-block mx-2 my-1 px-2 py-2 bg-green-400 dark:bg-gray-600 text-white font-bold text-sm rounded-md "
                          >
                            {machineName}
                          </li>
                        ) : (
                          <li
                            key={index}
                            className="inline-block px-2 py-2 bg-gray-300 text-white font-bold  rounded-md"
                          >
                            メダルゲーム：設置していないかまだ情報が更新されていません
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col md:flex-row bg-white p-4 rounded-lg shadow-md dark:bg-gray-800 transition-colors duration-300 ease-in-out">
            <div className="mb-4 md:mb-0 md:mr-4">
              <img
                src={
                  process.env.REACT_APP_PUBLIC_URL === "development"
                    ? `${imgUrl}/no-pictures.png`
                    : "/no-pictures.png"
                }
                className="w-44 h-44 object-contain m-auto"
                alt=""
              />
            </div>
            <hr />
            <div>
              <h3 className="text-lg mt-2 dark:text-white">
                お店が見つかりません
              </h3>
            </div>
          </div>
        )}
        {markers && <ScrollToTopButton />}
      </div>
    </>
  );
};

export default ShopsComponent;
