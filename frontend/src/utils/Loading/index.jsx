import "src/utils/Loading/Loading.css";
import { HashLoader } from "react-spinners";

const LoadingOverlay = () => (
  <div className="loadingOverlay">
    <HashLoader color="#60A5FA" width={8} />
    <p className="p-2 ml-2 font-bold">Loading...</p>
  </div>
);

export default LoadingOverlay;
