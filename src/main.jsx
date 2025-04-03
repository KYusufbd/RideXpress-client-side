import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import AvailableCars from "./pages/AvailableCars.jsx";
import Login from "./pages/Login.jsx";
import AddCar from "./pages/AddCar.jsx";
import MyCars from "./pages/MyCars.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import CarDetails from "./pages/CarDetails.jsx";
import AuthProvider from "./firebase/AuthProvider.jsx";
import DataProvider from "./components/DataProvider.jsx";
import axios from "axios";
import PrivateRoute from "./components/PrivateRoute.jsx";

// Set base URL of Axios
axios.defaults.baseURL = "http://localhost:5000/";
// Set Axios withCredentials to true by default
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/cars" element={<AvailableCars />} />
              <Route path="/cars/:id" element={<CarDetails />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/add-car"
                element={
                  <PrivateRoute>
                    <AddCar />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-cars"
                element={
                  <PrivateRoute>
                    <MyCars />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-bookings"
                element={
                  <PrivateRoute>
                    <MyBookings />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </DataProvider>
  </StrictMode>,
);
