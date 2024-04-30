import { LayoutOutlet } from "../../../containers/dashboard/LayoutWrapper";
import HomepageWrapper from "../../../containers/dashboard/HomepageWrapper";

export const HomeLayout = () => {
  return (
    <HomepageWrapper >
      <LayoutOutlet />
    </HomepageWrapper>
  );
};
