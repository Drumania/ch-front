import { useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dialog } from "primereact/dialog";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import AuthForm from "@/components/AuthForm";
import LanguageSelector from "@/components/LanguageSelector";
import { useAuth } from "@/context/AuthContext"; // 👈 Importar tu contexto

export default function HeaderUser() {
  const { user, userData } = useAuth(); // 👈 Desde el contexto
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState("login");
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
        <div className="header-user d-flex justify-content-end align-items-center">
          <Link to="/crear-lista" className="me-4">
            <button className="btn-new-list">Crear nueva lista</button>
          </Link>

          <div
            className="d-flex align-items-center cursor-pointer border-end pe-2"
            onClick={(e) => op.current.toggle(e)}
          >
            <span className="me-2">{userData?.displayName || user.email}</span>
            <img
              src={
                userData?.photoURL?.length
                  ? userData.photoURL
                  : "/img/defaultavatar.png"
              }
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
