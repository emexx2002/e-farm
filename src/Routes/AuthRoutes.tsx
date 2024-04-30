import { Navigate } from "react-router-dom";
import { AdminLayout } from "../pages/dashboard/layout/AdminLayout";
import { LazyRoute } from "../utils/helpers";
import { IModuleRouter } from "./index";
import HomePage from "../pages/Main/HomePage";
import { HomeLayout } from "../pages/dashboard/layout/HomeLayout";
import CartPage from "../pages/Main/CartPage";
import Login from "../pages/auth/Login";
import ProductPage from "../pages/Main/ProductPage";
import Register from "../pages/auth/Register";

export const AuthRouter: IModuleRouter = {
  key: "authroute",
  guard: (loggedIn, role) => !loggedIn || role === "" || role === null,
  layout: HomeLayout,
  routes: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: "/product/:id",
      element: <ProductPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ],
};
