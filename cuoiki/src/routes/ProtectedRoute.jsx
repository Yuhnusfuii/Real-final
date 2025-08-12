// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const authed = localStorage.getItem("auth") === "true";
  const location = useLocation();

  // Nếu chưa login, chuyển về /login và nhớ lại trang định vào
  if (!authed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  // Đã login thì render tiếp các route con
  return <Outlet />;
}
