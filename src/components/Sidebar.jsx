import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MyLists from "./lists/MyLists";

export default function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <aside>
      <Link to="/" className="img-logo">
        <img src="/img/logo.png" alt="Checklist" />
        <h1>Checklist</h1>
      </Link>

      <div className="wrap-my-lists ">
        <small>Mis listas</small>
        <MyLists />
      </div>
    </aside>
  );
}
