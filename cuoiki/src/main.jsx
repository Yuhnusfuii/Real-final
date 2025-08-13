import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ReactGA from "react-ga4";

// Khởi tạo GA với Measurement ID của bạn
ReactGA.initialize("G-HM2GL10JBG");


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
