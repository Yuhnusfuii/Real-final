import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css"; // nếu bạn có

// Lazy-load pages (code splitting)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

// Theo dõi page view cho SPA (nếu đã nhúng GA script vào index.html)
function RouteChangeTracker() {
  const location = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", window.GA_MEASUREMENT_ID || "%VITE_GA_ID%", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location.pathname, location.search]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* Theo dõi page view mỗi lần đổi route */}
      <RouteChangeTracker />

      <Suspense fallback={<div style={{ padding: "1rem" }}>Loading…</div>}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Private routes (cần đăng nhập) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* 404 đơn giản (tuỳ chọn) */}
          <Route path="*" element={<div style={{ padding: "1rem" }}>404 – Not Found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
