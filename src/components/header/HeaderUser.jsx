import { useRef, useState, useEffect } from "react";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dialog } from "primereact/dialog";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import AuthForm from "@/components/AuthForm";
import LanguageSelector from "@/components/LanguageSelector";

export default function HeaderUser() {
  const [user, setUser] = useState(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const op = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      console.log("🔥 Usuario detectado:", u);
      setUser(u);
    });
    return () => unsubscribe();
  }, []);
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
        <div className="header-user">
          <Link to="/crear-lista" className="me-4">
            <button className="btn-new-list">Crear nueva lista</button>
          </Link>

          <div
            className="d-flex align-items-center cursor-pointer border-end pe-2"
            onClick={(e) => op.current.toggle(e)}
          >
            <span className="me-2">{user.displayName || user.email}</span>
            <img
              src={
                user?.photoURL?.length
                  ? user.photoURL
                  : "/img/defaultavatar.png"
              }
              alt="avatar"
              className="avatar-circle"
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

          <div className="">
            <LanguageSelector />
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <button
            className="btn btn-primary"
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
