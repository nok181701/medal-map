import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "src/pages/Home";
import TermsOfService from "src/pages/TermsOfService";
import "src/styles/tailwind.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
