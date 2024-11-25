import { useEffect, useState } from "react";
import { databases } from "../appwriteConfig";

export default function Layout() {
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]); // Aseguramos que sea un arreglo vacío inicialmente

  const handleGetDocuments = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        "6743e31b000309628d2a",
        "6743e34d00031042facb"
      );
      setLists(response.documents); // Guardamos los documentos obtenidos
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetDocuments();
  }, []);

  return (
    <div>
      {/* Mostrar estado de carga */}
      {loading && <span>Cargando...</span>}

      {/* Mostrar los documentos si existen */}
      {!loading && lists.length > 0
        ? lists.map((list) => (
            <div key={list.$id}>
              <h1>{list.Name}</h1>
              <ul>
                {list.item.map((item) => (
                  <li key={item.$id}>
                    <h2>{item.title}</h2>
                    <p>Slug: {item.slug}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        : !loading && <span>No hay datos disponibles</span>}
    </div>
  );
}
