import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Layout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10 pe-4">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
