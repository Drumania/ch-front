import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <aside className="d-flex flex-column position-fixed vh-100 p-3">
      <div>
        <Link to="/" className="d-block fs-4 mb-3 text-decoration-none">
          <img src="/logo.png" className="img-logo" alt="Tappeat" />
        </Link>

        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              className={`nav-link py-3 ${
                location.pathname === "/" ? "active" : ""
              }`}
              to="/"
            >
              <i className="bi bi-house me-3"></i>
              {t("dashboard")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link py-3 ${
                location.pathname === "/customize" ? "active" : ""
              }`}
              to="/customize"
            >
              <i className="bi bi-palette me-3"></i>
              {t("customize")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link py-3 ${
                location.pathname === "/menu" ? "active" : ""
              }`}
              to="/menu"
            >
              <i className="bi bi-card-list me-3"></i>
              {t("build_menu")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link py-3 ${
                location.pathname === "/pays" ? "active" : ""
              }`}
              to="/pays"
            >
              <i className="bi bi-currency-exchange me-3"></i>
              {t("pays")}
              <strong className="pro ms-2">Pro</strong>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link py-3 ${
                location.pathname === "/customers" ? "active" : ""
              }`}
              to="/customers"
            >
              <i className="bi bi-person-lines-fill me-3"></i>
              {t("customers")} <strong className="pro ms-2">Pro</strong>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link detail py-3 ${
                location.pathname === "/generateqrs" ? "active" : ""
              }`}
              to="/generateqrs"
            >
              <i className="bi bi-qr-code me-3"></i>
              {t("generate_qr")}
            </Link>
          </li>
        </ul>
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
