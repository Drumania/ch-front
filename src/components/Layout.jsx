import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Layout = () => {
  return (
    <div className="d-flex">
      <aside>
        <Sidebar />
      </aside>

      <main className="main-layout">
        <header className="main-header">
          <Header />
        </header>

        <section className="main-content">
          <div className="wrap-outlet">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout;
