import { Navigate } from "react-router-dom";
import { AdminLayout } from "../pages/dashboard/layout/AdminLayout";
import { LazyRoute } from "../utils/helpers";
import { IModuleRouter } from "./index";
import HomePage from "../pages/Main/HomePage";
import { HomeLayout } from "../pages/dashboard/layout/HomeLayout";
import CartPage from "../pages/Main/CartPage";
import ProductPage from "../pages/Main/ProductPage";
import ProfilePage from "../pages/Main/ProfilePage";
import OrderSuccessPage from "../pages/Main/OrderSuccessPage";

export const BuyerRouter: IModuleRouter = {
  key: "Buyers",
  guard: (loggedIn, role) => loggedIn && role === "buyer",
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
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/product/:id",
      element: <ProductPage />,
    },
    {
      path: "/order-successful",
      element: <OrderSuccessPage />,
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ],
};
