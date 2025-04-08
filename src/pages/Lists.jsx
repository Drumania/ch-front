import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function PublicLists() {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListas = async () => {
      try {
        const q = query(
          collection(db, "listas_publicas"),
          orderBy("categoria")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListas(data);
      } catch (error) {
        console.error("Error al cargar listas públicas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListas();
  }, []);

  if (loading) return <p className="text-center">Cargando listas...</p>;

  const listasPorCategoria = listas.reduce((acc, lista) => {
    const cat = lista.categoria || "Sin categoría";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(lista);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Listas Públicas</h2>

      {Object.keys(listasPorCategoria).map((cat) => (
        <div key={cat} className="mb-4">
          <h4 className="mb-2">{cat}</h4>
          <div className="d-flex flex-wrap gap-3">
            {listasPorCategoria[cat].map((lista) => (
              <Link
                to={`/listas-publicas/${lista.id}`}
                key={lista.id}
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
        </div>
      ))}
    </div>
  );
}
