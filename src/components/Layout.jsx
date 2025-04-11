import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import IosInstallBanner from "@/components/IosInstallBanner";

const Layout = () => {
  return (
    <div className="container-fluid">
      <IosInstallBanner />
      <Header />

      <main>
        <Outlet />
      </main>
      {/* <aside>
        <Sidebar />
      </aside> */}
    </div>
  );
};

export default Layout;
