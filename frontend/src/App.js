import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import Home from "src/pages/Home";
import PrivacyPolicy from "src/pages/PrivacyPolicy";
import TermsOfService from "src/pages/TermsOfService";
import "src/styles/tailwind.css";

function App() {
  return (
    <div className="App">
      {/* LoadScriptをAppコンポーネント内で1度だけ読み込む */}
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </Router>
      </LoadScript>
    </div>
  );
}

export default App;
