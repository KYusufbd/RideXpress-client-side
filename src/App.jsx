import { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import DataContext from "./contexts/DataContext.js";

function App() {
  const [theme, setTheme] = useState("light");
  const { loading } = useContext(DataContext);

  // Function to scroll to top when the route is changed.
  const location = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  // Theme toggle function:
  const themeToggle = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
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
  );
}

export default App;
