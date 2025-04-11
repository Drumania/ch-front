import Logo from "./header/Logo";
import Search from "./header/Search";
import HeaderUser from "./header/HeaderUser";
import Navbar from "@/components/header/Navbar";

export default function Header() {
  return (
    <>
      <header className="row g-0">
        <div className="col-6 col-lg-3">
          <Logo />
        </div>

        <div className="d-none d-lg-flex col-4 text-center">
          <Search />
        </div>

        <div className="col-5 text-end">
          <HeaderUser />
        </div>
      </header>
      <div className="col-12">
        <Navbar />
      </div>
    </>
  );
}
