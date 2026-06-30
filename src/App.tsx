import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { BackgroundBrightnessProvider } from "@/components/BackgroundBrightnessProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useViewportScale } from "@/hooks/useViewportScale";
import LiquidGlassFilter from "@/components/LiquidGlassFilter";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

function ViewportScaleSetup() {
  useViewportScale();
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BackgroundBrightnessProvider>
        <Router>
          <ViewportScaleSetup />
          <LiquidGlassFilter />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </BackgroundBrightnessProvider>
    </ErrorBoundary>
  );
}
