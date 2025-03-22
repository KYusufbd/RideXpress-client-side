import { useEffect, useState } from "react";
import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";

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
  return (
    <div data-theme={theme}>
      <Navbar themeToggle={themeToggle} />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
