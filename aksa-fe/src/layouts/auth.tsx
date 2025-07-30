import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
