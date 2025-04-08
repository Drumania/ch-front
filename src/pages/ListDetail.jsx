// src/pages/ListDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function ListDetail() {
  const { id } = useParams(); // id de la lista
  const [lista, setLista] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      const ref = doc(db, "listas", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setLista({ ...snapshot.data(), id: snapshot.id });
      }
    };
    fetchList();
  }, [id]);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    const updatedCategorias = [
      ...(lista.categorias || []),
      {
        nombre: newCategory,
        items: [],
      },
    ];

    const ref = doc(db, "listas", id);
    await updateDoc(ref, {
      categorias: updatedCategorias,
    });

    setLista((prev) => ({
      ...prev,
      categorias: updatedCategorias,
    }));
    setNewCategory("");
  };

  if (!lista) return <p>Cargando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{lista.nombre}</h2>

      <h3>Agregar categoría</h3>
      <input
        type="text"
        placeholder="Nombre de la categoría"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAddCategory}>Agregar</button>

      <div style={{ marginTop: 20 }}>
        {lista.categorias?.map((cat, i) => (
          <div key={i} style={{ marginBottom: 15 }}>
            <strong>{cat.nombre}</strong>
            <ul>
              {cat.items?.map((item, j) => (
                <li key={j}>
                  <input type="checkbox" checked={item.checked} readOnly />{" "}
                  {item.nombre}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
