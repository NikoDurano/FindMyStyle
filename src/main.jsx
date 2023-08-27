import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes,Navigate } from "react-router-dom";
import App from "./App.jsx";
import Home from "./Home.jsx";
import "./index.css";

function Root() {
  return (
    <HashRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<Navigate to="/" replace/>} />
      </Routes>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
