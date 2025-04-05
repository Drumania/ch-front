import { useState } from "react";
import { Avatar } from "primereact/avatar";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
// import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Search from "./Search";
import { Button } from "primereact/button";

export default function Navbar() {
  const { t } = useTranslation();
  const [loggedInName] = useState({
    first_name: "Martin",
    last_name: "Brumana",
  });
  console.log(loggedInName);

  return (
    <nav className="position-sticky top-0 p-2">
      <Search />

      <div className="d-flex align-items-center">
        <Link className="navbar-name" to={"/settings"}>
          <span>
            {loggedInName.first_name} {loggedInName.last_name}
          </span>
          <Avatar
            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
            className="mr-2"
            size="large"
            shape="circle"
          />
        </Link>
        <div className="ps-2 ms-2">
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
}
