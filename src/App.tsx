import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { BackgroundBrightnessProvider } from "@/components/BackgroundBrightnessProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

export default function App() {
  return (
    <ErrorBoundary>
      <BackgroundBrightnessProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </BackgroundBrightnessProvider>
    </ErrorBoundary>
  );
}
