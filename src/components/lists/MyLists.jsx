import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import ThumbList from "./ThumbList";
import { doc, updateDoc } from "firebase/firestore";

export default function MyLists({ filter = "My Lists", onRequestLogin }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // <--- NUEVO
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Detectar usuario logueado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingUser(false); // <--- NUEVO
    });
    return () => unsub();
  }, []);

  // Cargar listas del usuario
  useEffect(() => {
    const fetchUserLists = async () => {
      if (!user) {
        setItems([]);
        setFilteredItems([]);
        setLoading(false);
        return;
      }

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
            isCreator: !lista.idListaPublica,
            favorite: lista.favorite === true,
            createdAt: lista.createdAt?.toDate?.() || new Date(0),
          };
        });

        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        console.error("Error al cargar tus listas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLists();
  }, [user]);

  // Filtro dinámico
  useEffect(() => {
    let filtradas = [...items];

    if (filter === "Created by me") {
      filtradas = filtradas.filter((item) => item.isCreator);
    }

    if (filter === "favorites") {
      filtradas = filtradas.filter((item) => item.favorite);
    }

    if (filter === "Latest added") {
      filtradas.sort((a, b) => b.createdAt - a.createdAt);
    }

    setFilteredItems(filtradas);
  }, [filter, items]);

  const toggleFavorite = async (item) => {
    const ref = doc(db, "listas_usuarios", item.id);
    const newFav = !item.favorite;

    try {
      await updateDoc(ref, { favorite: newFav });
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, favorite: newFav } : i))
      );
    } catch (err) {
      console.error("Error al actualizar favorito:", err);
    }
  };

  // Mostrar loading solo si aún está resolviendo auth
  if (loadingUser || loading)
    return <p className="text-center">Cargando tus listas...</p>;

  // Si no hay sesión activa
  if (!user)
    return (
      <div className="text-center mt-4">
        <p>Iniciá sesión o registrate para crear y guardar tus listas</p>
        <button className="btn btn-primary" onClick={onRequestLogin}>
          Iniciar sesión / Registrarse
        </button>
      </div>
    );

  return (
    <ul className="my-lists">
      {filteredItems.length ? (
        filteredItems.map((item) => (
          <ThumbList
            key={item.id}
            item={item}
            onToggleFavorite={toggleFavorite}
          />
        ))
      ) : (
        <p className="text-center">No se encontraron listas.</p>
      )}
    </ul>
  );
}

// Imagen de ejemplo por categoría (reemplazable luego por Firestore)
function obtenerImagenCategoria(categoria) {
  const imagenes = {
    Viajes: "https://source.unsplash.com/50x50/?travel",
    Anime: "https://source.unsplash.com/50x50/?anime",
    Gaming: "https://source.unsplash.com/50x50/?gaming",
    "Vida saludable": "https://source.unsplash.com/50x50/?healthy",
  };

  return imagenes[categoria] || "https://placehold.co/50x50";
}
