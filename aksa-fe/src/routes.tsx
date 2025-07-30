import { createBrowserRouter } from "react-router";
import GuestLayout from "./layouts/guest";
import AuthLayout from "./layouts/auth";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";

export const routes = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/", element: <HomePage /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [{ path: "/dashboard", element: <DashboardPage /> }],
  },
]);
