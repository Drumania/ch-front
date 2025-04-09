// src/pages/ListDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function ListDetail() {
  const { id } = useParams(); // id de la lista pública
  const [lista, setLista] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      const ref = doc(db, "listas_publicas", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setLista({ ...snapshot.data(), id: snapshot.id });
      } else {
        setLista(null);
      }
    };

    fetchList();
  }, [id]);

  if (lista === null) return <p>Cargando lista...</p>;
  if (!lista) return <p>❌ No se encontró la lista.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{lista.nombre}</h2>
      {lista.descripcion && <p>{lista.descripcion}</p>}

      <h3>Ítems</h3>
      <ul>
        {lista.items?.map((item, index) => (
          <li key={index}>
            <input type="checkbox" checked={item.checked} readOnly />{" "}
            {item.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}
