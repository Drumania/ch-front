import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/firebase/config"; // ajustá el path si es diferente
import { Link } from "react-router-dom";

export default function Categorys() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const ref = collection(db, "categorias");
        const q = query(ref, where("activa", "==", true), orderBy("orden"));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(data);
      } catch (error) {
        console.error("Error al cargar categorías desde Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) return <p className="text-center">Cargando categorías...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Categorías</h2>
      <div className="grid-categ">
        {categories.length ? (
          categories.map((category) => (
            <Link
              to={`/categorias/${category.nombre}`}
              className="grid-categ-item text-center"
              key={category.id}
            >
              <div
                className="category-icon mb-2"
                style={{ fontSize: "2.5rem" }}
              >
                {category.icono || "📁"}
              </div>
              <h2 className="mb-1">{category.nombre}</h2>
              <span className="text-muted small">ID: {category.id}</span>
            </Link>
          ))
        ) : (
          <p>No hay categorías disponibles.</p>
        )}
      </div>
    </div>
  );
}
