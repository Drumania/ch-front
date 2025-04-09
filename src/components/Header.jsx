import Logo from "./header/Logo";
import Search from "./header/Search";
import HeaderUser from "./header/HeaderUser";
import Navbar from "@/components/header/Navbar";

export default function Header() {
  return (
    <>
      <header className="row">
        <div className="col-3">
          <Logo />
        </div>

        <div className="col-4 text-center">
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
