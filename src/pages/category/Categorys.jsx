import { useEffect, useState } from "react";
import fetchData from "@/services/fetchData";
import { Link } from "react-router-dom";

export default function Categorys() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData("/categories", { populate: "*" })
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Categories</h2>
      <div className="grid-categ">
        {categories.map((category) => (
          <Link
            to={`/categories/${category.id}`}
            className="grid-categ-item"
            key={category.id}
          >
            <h2>{category.name}</h2>
            <span>ID: {category.id}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
