import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const Layout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Header />
        </div>
        <div className="col-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
