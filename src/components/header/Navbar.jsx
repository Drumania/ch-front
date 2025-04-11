import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useSlugify } from "@/hooks/useSlugify";

export default function Navbar() {
  const { slugify } = useSlugify();
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const activePath = location.pathname;
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll(); // inicial

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories]);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <nav className="category-navbar">
      <Link
        to="/mis-listas"
        className={`category-link fixed-link ${
          activePath === "/mis-listas" ? "active" : ""
        }`}
      >
        <div style={{ fontSize: "1.4rem" }} className="category-icon">
          ❤️
        </div>
        <div style={{ fontSize: "0.8rem" }}>Mis Listas</div>
      </Link>

      <div className="category-scroll-wrapper border-start">
        {canScrollLeft && <button className="scroll-btn left">←</button>}

        <div className="category-scroll" ref={scrollRef}>
          {[
            { label: "Todas", to: "/categorias", icon: "📋" },
            ...categories,
          ].map((cat) => {
            const path = cat.to || `/categorias/${slugify(cat.nombre)}`;
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
                <div style={{ fontSize: "1.4rem" }} className="category-icon">
                  {icon}
                </div>
                <div style={{ fontSize: "0.8rem" }}>{label}</div>
              </Link>
            );
          })}
        </div>

        {canScrollRight && <button className="scroll-btn right">→</button>}
        {/* Fade izquierdo */}
        <div className="scroll-fade scroll-fade-left" />

        {/* Fade derecho */}
        <div className="scroll-fade scroll-fade-right" />
      </div>
    </nav>
  );
}
