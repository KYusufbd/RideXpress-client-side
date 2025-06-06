import { Link, NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Navbar = ({ themeToggle }) => {
  const { user, logout } = useContext(AuthContext);

  const navMenu = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/cars">Available Cars</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-car">Add Car</NavLink>
          </li>
          <li>
            <NavLink to="/my-cars">My Cars</NavLink>
          </li>
          <li>
            <NavLink to="/my-bookings">My Bookings</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="w-full bg-base-200 sticky top-0 z-40">
      <nav className="navbar shadow-sm w-360 max-w-full mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-primary"
            >
              {navMenu}
            </ul>
          </div>
          <Link
            to="/"
            className="flex items-center cursor-pointer font-bold text-2xl"
          >
            <img className="hidden sm:inline h-10 rounded-lg" src="/logo.png" />
            <img className="sm:hidden h-10 rounded-lg" src="/logo-text.png" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg text-primary font-medium">
            {navMenu}
          </ul>
        </div>
        <div className="navbar-end flex flex-row gap-1">
          <>
            {!user && (
              <NavLink to="/login" className="btn btn-secondary">
                Login
              </NavLink>
            )}
            {user && (
              <button onClick={logout} className="btn btn-secondary">
                Log Out
              </button>
            )}
            <ThemeToggle themeToggle={themeToggle} />
          </>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
