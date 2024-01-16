import React from "react";

const ShopsComponent = (props) => {
  const imgUrl = process.env.REACT_APP_PUBLIC_URL;
  const { markers } = props;
  return (
    <>
      <div className="flex flex-col grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {markers.length !== 0 ? (
          markers.map((marker, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white p-4 rounded-lg shadow-md"
            >
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
                <h3 className="text-lg mt-2">{marker.name}</h3>
                <ul className="p-2">
                  <li>住所：{marker.address}</li>
                  <li>最寄り駅：{marker.nearestStation}</li>
                  <li>営業時間：{marker.businessHours}</li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col md:flex-row bg-white p-4 rounded-lg shadow-md">
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
              <h3 className="text-lg mt-2">お店が見つかりません</h3>
              {/* <ul className="p-2">
                <li>住所：{marker.address}</li>
                <li>最寄り駅：{marker.nearestStation}</li>
                <li>営業時間：{marker.businessHours}</li>
              </ul> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopsComponent;
