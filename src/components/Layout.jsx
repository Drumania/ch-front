import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import IosInstallBanner from "@/components/IosInstallBanner";
import InstallPrompt from "@/components/InstallPrompt";
import UpdateNotification from "@/components/UpdateNotification";

const Layout = () => {
  return (
    <div className="container-fluid g-0">
      <IosInstallBanner />
      <InstallPrompt />
      <UpdateNotification />

      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
