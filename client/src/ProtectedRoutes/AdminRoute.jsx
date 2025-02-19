import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, getUser, isLoading } = useContext(AuthContext);
  const location = useLocation();
  const userInfo = getUser();
  console.log(userInfo);

  const isAdmin = userInfo?.role === "admin";
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
