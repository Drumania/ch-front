import Logo from "./header/Logo";
import Search from "./header/Search";
import HeaderUser from "./header/HeaderUser";

export default function Navbar() {
  return (
    <header className="row">
      <div className="col-4">
        <Logo />
      </div>

      <div className="col-4 text-center">
        <Search />
      </div>

      <div className="col-4 text-end">
        <HeaderUser />
      </div>
    </header>
  );
}
