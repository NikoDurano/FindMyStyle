import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import App from "./App.jsx";
import Home from "./Home.jsx";
import "./index.css";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<Navigate to="/" replace/>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
