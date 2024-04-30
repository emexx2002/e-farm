import { Navigate } from "react-router-dom";
import { AdminLayout } from "../pages/dashboard/layout/AdminLayout";
import { LazyRoute } from "../utils/helpers";
import { IModuleRouter } from "./index";
import HomePage from "../pages/Main/HomePage";
import { HomeLayout } from "../pages/dashboard/layout/HomeLayout";

export const AdminDashRouter: IModuleRouter = {
  key: "dashboard",
  guard: (loggedIn, role) => loggedIn && role === "seller",
  layout: AdminLayout,
  routes: [
    {
      path: "/",
      element: <Navigate to={"/products"} />,
    },
    LazyRoute(
      {
        path: "/dashboard", 
      },
      () => import("../pages/dashboard/Dashboard")
    ),
    LazyRoute(
      {
        path: "/products/create", 
      },
      () => import("../pages/dashboard/CreateProductPage")
    ),
    LazyRoute(
      {
        path: "/products", 
      },
      () => import("../pages/dashboard/ProductPage")
    ),
    LazyRoute(
      {
        path: "/orders", 
      },
      () => import("../pages/dashboard/OrderPage")
    ),
    {
      path: "*",
      element: <div>Not found</div>,
    },
  ],
};
