// src/components/ThumbList.jsx
import { Link } from "react-router-dom";

export default function ThumbList({ item }) {
  return (
    <li className="thumb-list-item">
      <Link
        to={`/mis-listas/${item.id}`}
        className="d-flex align-items-center gap-3 text-decoration-none"
      >
        <img src={item.image} alt="" width={50} height={50} />
        <div>
          <h5 className="mb-1">{item.title}</h5>
          <small className="text-muted">{item.highlight}</small>
          {item.progress !== undefined && (
            <p className="mb-0 small text-success">
              ✅ {item.progress}% completado
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}
