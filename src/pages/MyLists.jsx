import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { Link } from "react-router-dom";

export default function MyLists() {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchMyLists = async () => {
      try {
        if (!user) return;

        const q = query(
          collection(db, "listas_usuarios"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setListas(data);
      } catch (error) {
        console.error("Error al cargar tus listas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyLists();
  }, [user]);

  if (!user)
    return <p className="text-center">Iniciá sesión para ver tus listas.</p>;
  if (loading) return <p className="text-center">Cargando tus listas...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Mis listas</h2>

      {listas.length === 0 ? (
        <p>No agregaste ninguna lista aún.</p>
      ) : (
        <div className="d-flex flex-wrap gap-3">
          {listas.map((lista) => {
            const total = lista.items.length;
            const completados = lista.items.filter(
              (item) => item.checked
            ).length;

            return (
              <Link
                key={lista.id}
                to={`/mis-listas/${lista.id}`}
                className="card p-3 text-decoration-none"
                style={{
                  width: "250px",
                  background: "#f9f9f9",
                  borderRadius: "12px",
                  border: "1px solid #ddd",
                }}
              >
                <h5 className="mb-1">{lista.nombre}</h5>
                <p className="text-muted small mb-1">{lista.categoria}</p>
                <p className="small">
                  {completados} de {total} completados ✅
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
