import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, auth } from "@/firebase/config";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function PublicListDetail() {
  const { id } = useParams();
  const [lista, setLista] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyInUserLists, setAlreadyInUserLists] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    const cargarLista = async () => {
      try {
        const ref = doc(db, "listas_publicas", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = { id: snap.id, ...snap.data() };
          setLista(data);

          if (user) {
            const userListQuery = query(
              collection(db, "listas_usuarios"),
              where("userId", "==", user.uid),
              where("idListaPublica", "==", data.id)
            );
            const res = await getDocs(userListQuery);
            if (!res.empty) {
              setAlreadyInUserLists(true);
            }
          }
        }
      } catch (error) {
        console.error("Error al obtener la lista:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarLista();
  }, [id, user]);

  const agregarAUsuario = async () => {
    if (!user || !lista) return;

    try {
      const listaUsuario = {
        idListaPublica: lista.id,
        userId: user.uid,
        nombre: lista.nombre,
        categoria: lista.categoria,
        createdAt: new Date(),
        items: lista.items.map((item) => ({
          nombre: item.nombre,
          checked: false, // estado personal
        })),
        completada: false,
      };

      await addDoc(collection(db, "listas_usuarios"), listaUsuario);
      setAlreadyInUserLists(true);
    } catch (error) {
      console.error("Error al guardar en tus listas:", error);
    }
  };

  if (loading) return <p className="text-center">Cargando lista...</p>;
  if (!lista) return <p className="text-center">Lista no encontrada.</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-2">{lista.nombre}</h2>
      <p className="text-muted">{lista.descripcion}</p>

      {user && !alreadyInUserLists && (
        <button className="btn btn-primary mb-3" onClick={agregarAUsuario}>
          ➕ Agregar a mis listas
        </button>
      )}

      {user && alreadyInUserLists && (
        <p className="text-success">✅ Ya agregaste esta lista</p>
      )}

      <h4 className="mt-4 mb-2">Ítems</h4>
      <ul className="list-group">
        {lista.items.map((item, i) => (
          <li key={i} className="list-group-item">
            ✅ {item.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}
