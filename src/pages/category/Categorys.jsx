import { useEffect, useState } from "react";
import fetchData from "@/services/fetchData";
import { Link } from "react-router-dom";

export default function Categorys() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("/categories", { populate: ["*"] })
      .then((response) => {
        console.log(response);
        setCategories(response);
      })
      .catch((err) => console.error("Error al cargar categorías:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Cargando categorías...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Categorías</h2>
      <div className="grid-categ">
        {categories.length ? (
          categories.map((category) => {
            const imageUrl =
              category.thumbcategory?.formats?.thumbnail?.url ||
              category.thumbcategory?.url;
            const listCount = category.lists?.length || 0;

            return (
              <Link
                to={`/categories/${category.id}`}
                className="grid-categ-item"
                key={category.id}
              >
                {imageUrl ? (
                  <img
                    src={`http://localhost:1337${imageUrl}`}
                    alt={category.name}
                    className="category-thumb"
                  />
                ) : (
                  <div className="category-thumb placeholder">
                    <span>Sin imagen</span>
                  </div>
                )}

                <h2>{category.name}</h2>
                <span>ID: {category.id}</span>
                <p className="mt-2">
                  {listCount} lista{listCount !== 1 ? "s" : ""} disponible
                  {listCount !== 1 ? "s" : ""}
                </p>
              </Link>
            );
          })
        ) : (
          <p>No hay categorías disponibles.</p>
        )}
      </div>
    </div>
  );
}
