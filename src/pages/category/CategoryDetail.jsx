import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "@/services/fetchData";

export default function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(`/categories/${id}`, { populate: "lists" })
      .then((data) => {
        setCategory(data);
      })
      .catch((err) => console.error("Error cargando categoría:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center">Cargando categoría...</p>;
  if (!category)
    return <p className="text-center">No se encontró la categoría.</p>;

  const { name, lists } = category.attributes;
  const listas = lists?.data || [];

  return (
    <div className="container mt-4">
      <h2 className="mb-2">Categoría: {name}</h2>
      <p className="text-muted">ID: {category.id}</p>

      <h4 className="mt-4 mb-2">Listas de esta categoría:</h4>

      {listas.length ? (
        <ul className="list-group">
          {listas.map((list) => (
            <li className="list-group-item" key={list.id}>
              {list.attributes.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay listas en esta categoría.</p>
      )}
    </div>
  );
}
