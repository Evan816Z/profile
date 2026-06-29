import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { BackgroundBrightnessProvider } from "@/components/BackgroundBrightnessProvider";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

export default function App() {
  return (
    <BackgroundBrightnessProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </BackgroundBrightnessProvider>
  );
}
