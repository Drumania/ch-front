import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MyLists from "./lists/MyLists";

export default function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <aside>
      <div>
        <Link to="/" className="img-logo">
          <img src="/img/logo.png" alt="Checklist" />
          <h1>Checklist</h1>
        </Link>

        <div className="nav flex-column mt-5">
          <small>Mis listas</small>
          <MyLists />
        </div>
      </div>

      <ul className="nav flex-column border-top pt-2">
        <li className="nav-item">
          <Link
            className={`nav-link py-3 ${
              location.pathname === "/settings" ? "active" : ""
            }`}
            to="/settings"
          >
            <i className="bi bi-gear me-3"></i>
            {t("settings")}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link pt-3 pb-5 ${
              location.pathname === "/logout" ? "active" : ""
            }`}
            to="/logout"
          >
            <i className="bi bi-box-arrow-left me-3"></i>
            {t("logout")}
          </Link>
        </li>
      </ul>
    </aside>
  );
}
