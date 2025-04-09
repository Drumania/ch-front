import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { Chip } from "primereact/chip";
import MyLists from "./lists/MyLists";
import AuthForm from "./AuthForm";
import { Dialog } from "primereact/dialog";

export default function Sidebar() {
  const { t } = useTranslation();
  const [selectedTag, setSelectedTag] = useState("My Lists");
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // o "register"

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setShowAuthDialog(false); // 👈 Cierra modal si se loguea
      }
    });
    return () => unsubscribe();
  }, []);

  const tags = [
    { label: "Mis Listas", value: "My Lists" },
    { label: "Creadas por mi", value: "Created by me" },
    { label: "Favoritos", value: "favorites" },
    { label: "Ultimas agregadas", value: "Latest added" },
  ];

  const openAuthDialog = (mode = "login") => {
    setAuthMode(mode);
    setShowAuthDialog(true);
  };

  const handleTagClick = (value) => {
    setSelectedTag(value);
    // Aquí podrías filtrar o navegar
  };

  return (
    <>
      <Link to="/" className="img-logo d-flex align-items-center mb-4">
        <img src="/img/logo.png" alt="Checklist" className="me-2" />
        <h1 className="h5 m-0">Checklist</h1>
      </Link>

      {/* Sección de listas */}
      <div className="wrap-my-lists">
        {/* Chips scroll horizontal */}
        <div className="wrap-chips-detail">&nbsp;</div>
        {user && (
          <div className="wrap-chips">
            {tags.map((tag) => (
              <Chip
                key={tag.value}
                label={tag.label}
                className={`chips text-nowrap cursor-pointer flex-shrink-0 ${
                  selectedTag === tag.value ? "active" : ""
                }`}
                onClick={() => handleTagClick(tag.value)}
                style={{ scrollSnapAlign: "start" }}
              />
            ))}
          </div>
        )}
        <MyLists
          filter={selectedTag}
          onRequestLogin={() => openAuthDialog("login")}
        />

        <div className="wrap-new-list">
          {user ? (
            <Link to="/crear-lista">
              <button className="btn-new-list">Crear nueva lista</button>
            </Link>
          ) : (
            <button
              className="btn-new-list"
              onClick={() => openAuthDialog("register")}
            >
              Crear nueva lista
            </button>
          )}
        </div>

        <Dialog
          header={authMode === "login" ? "Iniciar sesión" : "Registrarse"}
          visible={showAuthDialog}
          style={{ width: "400px" }}
          onHide={() => setShowAuthDialog(false)}
        >
          <AuthForm mode={authMode} onClose={() => setShowAuthDialog(false)} />
        </Dialog>
      </div>
    </>
  );
}
