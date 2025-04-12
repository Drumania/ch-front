import { useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Sidebar } from "primereact/sidebar";
import { Dialog } from "primereact/dialog";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import AuthForm from "@/components/AuthForm";
import LanguageSelector from "@/components/LanguageSelector";
import { useAuth } from "@/context/AuthContext";

export default function HeaderUser() {
  const { user } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [menuAbierto, setMenuAbierto] = useState(false);
  const op = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const openAuthDialog = (mode = "login") => {
    setAuthMode(mode);
    setShowAuthDialog(true);
  };

  return (
    <>
      {user ? (
        <div className="header-user-container">
          {/* Mobile: botón hamburguesa */}
          <div
            className="hamburguesa-mobile d-md-none"
            onClick={() => setMenuAbierto(true)}
          >
            <img
              src={user?.photoURL || "/img/defaultavatar.png"}
              alt="avatar"
              className="avatar-circle"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <span className="ms-2 fs-4">☰</span>
          </div>

          {/* Desktop: barra completa */}
          <div className="header-user d-none d-md-flex justify-content-end align-items-center">
            <Link to="/crear-lista" className="me-4">
              <button className="btn-new-list">Crear nueva lista</button>
            </Link>

            <div
              className="d-flex align-items-center cursor-pointer border-end pe-2"
              onClick={(e) => op.current.toggle(e)}
            >
              <span className="me-2">{user?.displayName || user.email}</span>
              <img
                src={user?.photoURL || "/img/defaultavatar.png"}
                alt="avatar"
                className="avatar-circle"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
              <span className="ms-2 fs-4">☰</span>
            </div>

            <OverlayPanel ref={op}>
              <ul className="list-unstyled mb-0">
                <li>
                  <Link to="/settings" className="dropdown-item">
                    ⚙️ Perfil
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item">
                    🚪 Cerrar sesión
                  </button>
                </li>
              </ul>
            </OverlayPanel>

            <div className="ms-3">
              <LanguageSelector />
            </div>
          </div>

          {/* Mobile: menú lateral con Sidebar */}
          <Sidebar
            visible={menuAbierto}
            onHide={() => setMenuAbierto(false)}
            position="right"
            style={{ width: "260px" }}
            showCloseIcon
          >
            <ul className="list-unstyled mt-3">
              <li className="mb-3">
                <Link to="/crear-lista" onClick={() => setMenuAbierto(false)}>
                  ➕ Crear nueva lista
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/settings" onClick={() => setMenuAbierto(false)}>
                  ⚙️ Perfil
                </Link>
              </li>
              <li className="mb-3">
                <button
                  className="btn btn-link"
                  onClick={() => {
                    handleLogout();
                    setMenuAbierto(false);
                  }}
                >
                  🚪 Cerrar sesión
                </button>
              </li>
              <li>
                <LanguageSelector />
              </li>
            </ul>
          </Sidebar>
        </div>
      ) : (
        <div className="d-flex justify-content-end align-items-center h-100">
          <button
            className="btn-transparent cursor-pointer"
            onClick={() => openAuthDialog("login")}
          >
            Iniciar sesión / Registrarse
          </button>

          <Dialog
            header={authMode === "login" ? "Iniciar sesión" : "Registrarse"}
            visible={showAuthDialog}
            style={{ width: "400px" }}
            onHide={() => setShowAuthDialog(false)}
          >
            <AuthForm
              mode={authMode}
              onClose={() => setShowAuthDialog(false)}
            />
          </Dialog>
        </div>
      )}
    </>
  );
}
