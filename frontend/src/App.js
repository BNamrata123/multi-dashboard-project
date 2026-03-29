import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Jobs from "./pages/Jobs";
import Entertainment from "./pages/Entertainment";
import MentalHealth from "./pages/MentalHealth";
import AddDataset from "./pages/AddDataset";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* ✅ DEFAULT PAGE */}
        <Route path="/" element={<Entertainment />} />

        {/* ✅ ALL ROUTES */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/mental" element={<MentalHealth />} />
        <Route path="/add" element={<AddDataset />} />
      </Routes>
    </Router>
  );
}

export default App;