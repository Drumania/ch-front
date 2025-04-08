import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/config";

export default function MyListDetail() {
  const { id } = useParams();
  const [lista, setLista] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const cargarLista = async () => {
      try {
        const ref = doc(db, "listas_usuarios", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          if (data.userId !== user?.uid) {
            setLista(null); // no permitir ver otras listas
          } else {
            setLista({ id: snap.id, ...data });
          }
        }
      } catch (error) {
        console.error("Error al obtener tu lista:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarLista();
  }, [id, user]);

  const toggleCheck = async (index) => {
    if (!lista) return;

    const nuevaLista = [...lista.items];
    nuevaLista[index].checked = !nuevaLista[index].checked;

    const ref = doc(db, "listas_usuarios", lista.id);
    await updateDoc(ref, { items: nuevaLista });

    setLista((prev) => ({ ...prev, items: nuevaLista }));
  };

  if (loading) return <p className="text-center">Cargando lista...</p>;
  if (!lista)
    return (
      <p className="text-center">Lista no encontrada o acceso no autorizado.</p>
    );

  return (
    <div className="container mt-4">
      <h2 className="mb-2">{lista.nombre}</h2>
      <p className="text-muted">{lista.categoria}</p>

      <ul className="list-group mt-3">
        {lista.items.map((item, i) => (
          <li key={i} className="list-group-item d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={item.checked}
              onChange={() => toggleCheck(i)}
            />
            {item.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}
