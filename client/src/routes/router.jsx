import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/Main";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import App from "../App";

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
        path: "/",
        element: <Cart />,
      },
      {
        path: "/",
        element: <Shop />,
      },
    ],
  },
  {
    path: "/test",
    element: <App></App>,
  },
]);
export default router;
