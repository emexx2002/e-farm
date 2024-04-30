
import { SideItem } from "../../../containers/dashboard/Sidebar";
import { DashboardWrapper } from "../../../containers/dashboard/DashboardWrapper";
import { LayoutOutlet } from "../../../containers/dashboard/LayoutWrapper";

export const AdminLayout = () => {
  return (
    <DashboardWrapper sidebar={sidebar}>
      <LayoutOutlet />
    </DashboardWrapper>
  );
};
export const sidebar: SideItem[] = [
  // { name: "Dashboard", path: "/dashboard", iconName: "dashboard" },
  { name: "Products", path: "/products", iconName: "discover" },
  { name: "Orders", path: "/orders", iconName: "orders" },
  // { name: "Settings", path: "/settings", iconName: "settings" },
];
