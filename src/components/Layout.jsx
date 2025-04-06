import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Layout = () => {
  return (
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-2 ">
          <Sidebar />
        </div>
        <div className="col-10 pe-4 d-flex flex-column wrap-header">
          <div className="header-fixed" style={{ zIndex: 10 }}>
            <Header />
          </div>

          <div className="flex-grow-1 overflow-auto scroll-mac p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
