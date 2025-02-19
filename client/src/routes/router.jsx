import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import App from "../App";
import Setting from "../pages/User/Setting";
import Profile from "../pages/User/Profile";
import AdminLayout from "../layouts/AdminLatout.jsx/index";
import Dashboard from "../pages/Admin/Dashboard";
import AddProduct from "../pages/Admin/AddProduct";
import MenageItem from "../pages/Admin/MenageItem";
import Users from "../pages/Admin/Users";
import ManageOrders from "../pages/Admin/MenageOrders";
import AdminRoute from "../ProtectedRoutes/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/profile/setting",
        element: <Setting />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "manage-item",
        element: <MenageItem />,
      },
      {
        path: "user-list",
        element: <Users />,
      },
      {
        path: "orders",
        element: <ManageOrders />,
      },
    ],
  },
]);
export default router;
