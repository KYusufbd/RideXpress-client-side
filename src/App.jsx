import { useEffect, useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import DataContext from "./contexts/DataContext.js";

function App() {
  const [theme, setTheme] = useState("light");

  // Function to scroll to top when the route is changed.
  const location = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  // Theme toggle function:
  const themeToggle = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const data = {
    cars,
    setCars,
    loading,
    setLoading,
  };

  return (
    <DataContext.Provider value={data}>
      <div data-theme={theme}>
        <Navbar themeToggle={themeToggle} />
        <main className="min-h-screen relative">
          <Outlet />
          <ToastContainer />
          {loading && (
            <div className="absolute top-0 w-full h-full flex justify-center items-center bg-transparent z-10">
              <span className="loading loading-dots loading-xl"></span>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </DataContext.Provider>
  );
}

export default App;
