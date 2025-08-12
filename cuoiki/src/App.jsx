import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div style={{ padding: "1rem" }}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Nhóm các route cần bảo vệ */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
