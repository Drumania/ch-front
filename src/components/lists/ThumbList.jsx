// src/components/ThumbList.jsx
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

export default function ThumbList({ item, onToggleFavorite }) {
  return (
    <li className="thumb-list-item d-flex justify-content-between align-items-center">
      <Link
        to={`/mis-listas/${item.id}`}
        className="d-flex align-items-center gap-3 text-decoration-none"
      >
        <img src={item.image} alt="" width={50} height={50} />
        <div>
          {item.added && (
            <span className="badge bg-success position-absolute top-0 end-0 m-1">
              ✅ Agregada
            </span>
          )}
          <h5 className="mb-1">{item.title}</h5>
          <small className="text-muted">{item.highlight}</small>
          {item.progress !== undefined && (
            <p className="mb-0 small text-success">
              ✅ {item.progress}% completado
            </p>
          )}
        </div>
      </Link>

      {/* Estrella para marcar favorito */}
      <Button
        icon={item.favorite ? "pi pi-star-fill" : "pi pi-star"}
        className="p-button-text"
        onClick={() => onToggleFavorite(item)}
        tooltip={item.favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      />
    </li>
  );
}
