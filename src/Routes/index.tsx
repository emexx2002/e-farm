import { Suspense, useEffect, useState } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { AuthRouter } from "./AuthRoutes";
import { AdminDashRouter } from "./DashboardRoutes";
import { AppFallback } from "./Layout";
import { useAuth } from "../zustand/auth.store";
import { BuyerRouter } from "./BuyerRoutes";

export interface IModuleRouter {
  guard: (loggedIn: boolean, role?:any ) => boolean;
  routes: RouteObject[];
  layout?: () => JSX.Element;
  key: string;
}

const ModuleRouters: Array<IModuleRouter> = [AuthRouter, AdminDashRouter, BuyerRouter];

export const AppRouter = () => {
  const [router, setRouter] = useState<IModuleRouter | null>(null);
  // const isLoggedIn: boolean = useAuth(s => !!s.token)
  const isLoggedIn: boolean = true;
  const role:any = useAuth(s => s.role)
  // const role:any = "seller"

  console.log(role)

  useEffect(() => {
    const routeToRender = ModuleRouters.find((rtr) => rtr.guard(isLoggedIn, role));
    console.log(routeToRender)
    if (routeToRender) {
      setRouter(routeToRender);
    } else {
      setRouter(null);
    }
  }, [isLoggedIn, role]);

  const Layout = router?.layout ?? AppFallback;
  const routerView = useRoutes([
    {
      element: <Layout />,
      children: router?.routes ?? [],
    },
  ]);

  if (!router) {
    return <AppFallback screen />;
  }
  return <Suspense fallback={<AppFallback />}>{routerView}</Suspense>;
};
