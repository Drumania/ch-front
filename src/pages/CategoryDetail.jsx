import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

export default function CategoryDetail() {
  const { nombre } = useParams(); // el nombre de la categoría (ej: Viajes)
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarListas = async () => {
      try {
        const ref = collection(db, "listas_publicas");
        const q = query(
          ref,
          where("categoria", "==", nombre),
          orderBy("nombre")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListas(data);
      } catch (err) {
        console.error("Error al cargar listas:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarListas();
  }, [nombre]);

  if (loading) return <p className="text-center">Cargando listas...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Listas de "{nombre}"</h2>

      {listas.length ? (
        <div className="d-flex flex-wrap gap-3">
          {listas.map((lista) => (
            <Link
              key={lista.id}
              to={`/listas-publicas/${lista.id}`}
              className="card p-3 text-decoration-none"
              style={{
                width: "250px",
                background: "#f9f9f9",
                borderRadius: "12px",
                border: "1px solid #ddd",
              }}
            >
              <h5 className="mb-1">{lista.nombre}</h5>
              <p className="text-muted small mb-0">
                {lista.items?.length || 0} ítems
              </p>
              {lista.descripcion && (
                <p className="small mt-2">{lista.descripcion}</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p>No hay listas en esta categoría.</p>
      )}
    </div>
  );
}
