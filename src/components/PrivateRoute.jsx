import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const redirectPath = location.pathname;
  if (user) {
    // User is authenticated, allow access to the route
    return children;
  }

  if (user === null) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" state={{ from: redirectPath }} replace />;
  }
};

export default PrivateRoute;
