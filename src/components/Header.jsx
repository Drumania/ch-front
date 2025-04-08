import { useEffect, useRef, useState } from "react";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import AuthForm from "./AuthForm"; // Este lo vamos a crear justo abajo

export default function Navbar() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const op = useRef(null);
  const navigate = useNavigate();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="d-flex justify-content-between align-items-center p-2">
      <Search />

      {user ? (
        <div className="d-flex align-items-center">
          <div
            className="d-flex align-items-center cursor-pointer"
            onClick={(e) => op.current.toggle(e)}
          >
            <span className="me-2">{user.displayName || user.email}</span>
            <Avatar
              image={user.photoURL || "https://ui-avatars.com/api/?name=User"}
              size="large"
              shape="circle"
            />
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

          <div className="ps-2 ms-2">
            <LanguageSelector />
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <button
            className="btn btn-primary"
            onClick={() => setShowAuthDialog(true)}
          >
            Iniciar sesión / Registrarse
          </button>

          <Dialog
            header="Bienvenido"
            visible={showAuthDialog}
            style={{ width: "400px" }}
            onHide={() => setShowAuthDialog(false)}
          >
            <AuthForm onClose={() => setShowAuthDialog(false)} />
          </Dialog>
        </div>
      )}
    </nav>
  );
}
