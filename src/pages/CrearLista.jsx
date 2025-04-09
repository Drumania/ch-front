import { useEffect, useState } from "react";
import { db, auth } from "@/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { useSlugify } from "@/hooks/useSlugify";

export default function CrearLista() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([]);
  const [items, setItems] = useState([""]);
  const [guardando, setGuardando] = useState(false);
  const user = auth.currentUser;

  const { slugify } = useSlugify(); // Hook para generar slug

  useEffect(() => {
    const fetchCategorias = async () => {
      const q = query(
        collection(db, "categorias"),
        where("activa", "==", true)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data().nombre);
      setCategoriasDisponibles(data);
    };

    fetchCategorias();
  }, []);

  const handleItemChange = (index, value) => {
    const nuevosItems = [...items];
    nuevosItems[index] = value;
    setItems(nuevosItems);
  };

  const agregarItem = () => setItems([...items, ""]);
  const quitarItem = (index) => setItems(items.filter((_, i) => i !== index));

  const handleGuardar = async () => {
    if (!titulo || !categoria || items.length === 0 || !user) return;

    const itemsFiltrados = items
      .map((nombre) => nombre.trim())
      .filter((nombre) => nombre.length > 0)
      .map((nombre) => ({ nombre, checked: false }));

    if (itemsFiltrados.length === 0) return;

    const slug = slugify(categoria); // genera el slug

    setGuardando(true);

    try {
      // 1. Guardar en listas_publicas
      const publicRef = await addDoc(collection(db, "listas_publicas"), {
        nombre: titulo,
        categoria,
        slug_categoria: slug,
        creadorId: user.uid,
        createdAt: serverTimestamp(),
        items: itemsFiltrados,
        descripcion: "", // opcional
        popularidad: 0,
      });

      // 2. Guardar en listas_usuarios como copia personal
      await addDoc(collection(db, "listas_usuarios"), {
        idListaPublica: publicRef.id,
        userId: user.uid,
        nombre: titulo,
        categoria,
        slug_categoria: slug,
        items: itemsFiltrados,
        createdAt: serverTimestamp(),
        completada: false,
        favorite: false,
      });

      alert("✅ Lista creada y guardada correctamente");

      // Limpiar formulario
      setTitulo("");
      setCategoria("");
      setItems([""]);
    } catch (err) {
      console.error("Error al guardar la lista:", err);
      alert("❌ Ocurrió un error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Crear nueva lista</h2>

      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej: Cosas para hacer en Japón"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <select
          className="form-select"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Seleccionar categoría</option>
          {categoriasDisponibles.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Ítems</label>
        {items.map((item, index) => (
          <div key={index} className="d-flex align-items-center mb-2 gap-2">
            <input
              type="text"
              className="form-control"
              value={item}
              placeholder={`Ítem ${index + 1}`}
              onChange={(e) => handleItemChange(index, e.target.value)}
            />
            {items.length > 1 && (
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => quitarItem(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-primary btn-sm mt-2"
          onClick={agregarItem}
        >
          + Agregar ítem
        </button>
      </div>

      <button
        className="btn btn-success"
        onClick={handleGuardar}
        disabled={guardando}
      >
        {guardando ? "Guardando..." : "Guardar lista"}
      </button>
    </div>
  );
}
