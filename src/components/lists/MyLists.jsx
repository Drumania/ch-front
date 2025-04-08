import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import ThumbList from "./ThumbList";

export default function MyLists() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Espera a que Firebase determine si hay un usuario logueado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchUserLists = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "listas_usuarios"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          const lista = doc.data();
          const total = lista.items.length;
          const completados = lista.items.filter((item) => item.checked).length;
          const progress = total ? Math.round((completados / total) * 100) : 0;

          return {
            id: doc.id,
            title: lista.nombre,
            highlight: lista.categoria,
            image: obtenerImagenCategoria(lista.categoria),
            progress,
          };
        });
        setItems(data);
      } catch (err) {
        console.error("Error al cargar tus listas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLists();
  }, [user]);

  if (loading) return <p className="text-center">Cargando tus listas...</p>;

  if (!user)
    return <p className="text-center">Iniciá sesión para ver tus listas.</p>;

  return (
    <>
      <ul className="my-lists">
        {items.length ? (
          items.map((item) => <ThumbList key={item.id} item={item} />)
        ) : (
          <p className="text-center">Aún no agregaste ninguna lista.</p>
        )}
      </ul>
    </>
  );
}

function obtenerImagenCategoria(categoria) {
  const imagenes = {
    Viajes: "https://source.unsplash.com/50x50/?travel",
    Anime: "https://source.unsplash.com/50x50/?anime",
    Gaming: "https://source.unsplash.com/50x50/?gaming",
    "Vida saludable": "https://source.unsplash.com/50x50/?healthy",
  };

  return imagenes[categoria] || "https://placehold.co/50x50";
}
