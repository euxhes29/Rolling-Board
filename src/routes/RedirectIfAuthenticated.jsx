import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }) => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RedirectIfAuthenticated;
