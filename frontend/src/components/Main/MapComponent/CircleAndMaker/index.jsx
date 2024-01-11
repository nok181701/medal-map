import { CircleF, MarkerF } from "@react-google-maps/api";
import "src/styles/Main/MapComponent/MapComponent.css";

const CircleAndMaker = ({ defaultPosition, currentPosition, position }) => {
  return (
    <>
      <CircleF
        center={defaultPosition || currentPosition || position}
        radius={1000}
        options={{
          strokeColor: "#ee3f3c",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#ffa38f",
          fillOpacity: 0.35,
        }}
      />
      <MarkerF position={defaultPosition || currentPosition || position} />
    </>
  );
};

export default CircleAndMaker;
