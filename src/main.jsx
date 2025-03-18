import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import AvailableCars from "./pages/AvailableCars.jsx";
import Login from "./pages/Login.jsx";
import AddCar from './pages/AddCar.jsx';
import MyCars from './pages/MyCars.jsx';
import MyBookings from './pages/MyBookings.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/cars" element={<AvailableCars />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/my-cars" element={<MyCars />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
