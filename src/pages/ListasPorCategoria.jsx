import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useSlugify } from "@/hooks/useSlugify";
import { auth } from "@/firebase/config";
import ListaThumb from "@/components/ListaThumb";

export default function ListasPorCategoria() {
  const { categoria } = useParams(); // viene como slug en la URL
  const { slugify } = useSlugify();
  const navigate = useNavigate();

  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListas = async () => {
      setLoading(true);
      try {
        const ref = collection(db, "listas_publicas");

        let q;
        if (categoria) {
          // Buscamos por el slug en Firestore
          q = query(ref, where("slug_categoria", "==", categoria));
        } else {
          // Si no hay categoría en la URL, mostramos todas
          q = query(ref);
        }

        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setListas(data);
      } catch (error) {
        console.error("Error al obtener listas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListas();
  }, [categoria]);

  const handleVerLista = (lista) => {
    navigate(`/lista/${lista.id}`);
  };

  const handleAgregarLista = async (lista) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Tenés que iniciar sesión para agregar listas.");
      return;
    }

    try {
      await addDoc(collection(db, "listas_usuarios"), {
        idListaPublica: lista.id,
        userId: user.uid,
        nombre: lista.nombre,
        categoria: lista.categoria,
        slug_categoria: lista.slug_categoria,
        items: lista.items || [],
        createdAt: serverTimestamp(),
        completada: false,
        favorite: false,
      });

      alert("✅ Lista agregada a tus listas");
    } catch (err) {
      console.error("Error al duplicar lista:", err);
      alert("❌ Ocurrió un error al agregar la lista.");
    }
  };

  return (
    <div className="listas-por-categoria py-4">
      <h2 className="titulo-categoria py-3">
        {categoria
          ? `Listas de ${categoria.replaceAll("-", " ")}`
          : "Todas las listas"}
      </h2>

      {loading ? (
        <p>Cargando listas...</p>
      ) : listas.length === 0 ? (
        <p>No hay listas en esta categoría.</p>
      ) : (
        // <ul className="lista-de-listas">
        <ul className="d-flex flex-wrap gap-3">
          {listas.map((lista) => (
            <ListaThumb
              key={lista.id}
              lista={lista}
              onVer={handleVerLista}
              onAgregar={handleAgregarLista}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
