import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const Layout = () => {
  return (
    <div className="container-fluid">
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
