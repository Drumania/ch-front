import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "@/services/fetchData";

export default function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchData(`/categories/${id}`, { populate: "*" })
      .then((data) => {
        console.log(data);
        setCategory(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!category) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Categoría: {category.name}</h2>
      <p>ID: {category.id}</p>

      {/* Por ejemplo: mostrar productos relacionados */}
      {category.products?.length ? (
        <ul>
          {category.products.map((prod) => (
            <li key={prod.id}>{prod.name}</li>
          ))}
        </ul>
      ) : (
        <p>No hay productos en esta categoría.</p>
      )}
    </div>
  );
}
