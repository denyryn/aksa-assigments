import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

export default function GuestLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
