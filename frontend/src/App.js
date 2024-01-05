import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "src/pages/Home";
import "src/styles/tailwind.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
