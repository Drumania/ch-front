import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const activePath = location.pathname;

  useEffect(() => {
    const fetchCategories = async () => {
      const ref = collection(db, "categorias");
      const q = query(ref, where("activa", "==", true));
      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <nav className="category-navbar">
      {/* Link fijo (Mis Listas) */}
      <Link
        to="/mis-listas"
        className={`category-link fixed-link ${
          activePath === "/mis-listas" ? "active" : ""
        }`}
      >
        <div style={{ fontSize: "1.4rem" }}>❤️</div>
        <div style={{ fontSize: "0.8rem" }}>Mis Listas</div>
      </Link>

      {/* Scrollable contenedor con fade */}
      <div className="category-scroll-wrapper">
        <div className="category-scroll">
          {[
            { label: "Todas", to: "/listas-publicas", icon: "📋" },
            ...categories,
          ].map((cat) => {
            const path = cat.to || `/categorias/${cat.id}`;
            const icon = cat.icono || "📁";
            const label = cat.label || cat.nombre;

            return (
              <Link
                key={path}
                to={path}
                className={`category-link ${
                  activePath === path ? "active" : ""
                }`}
              >
                <div style={{ fontSize: "1.4rem" }}>{icon}</div>
                <div style={{ fontSize: "0.8rem" }}>{label}</div>
              </Link>
            );
          })}
        </div>
        <div className="scroll-fade-right" />
      </div>
    </nav>
  );
}
