import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Chip } from "primereact/chip";
import MyLists from "./lists/MyLists";
import { Button } from "primereact/button";

export default function Sidebar() {
  const { t } = useTranslation();
  const [selectedTag, setSelectedTag] = useState("My Lists");

  const tags = [
    { label: "Mis Listas", value: "My Lists" },
    { label: "Creadas por mi", value: "Created by me" },
    { label: "Favoritos", value: "favorites" },
    { label: "Ultimas agregadas", value: "Latest added" },
  ];

  const handleTagClick = (value) => {
    setSelectedTag(value);
    // Aquí podrías filtrar o navegar
  };

  return (
    <>
      <Link to="/" className="img-logo d-flex align-items-center mb-4">
        <img src="/img/logo.png" alt="Checklist" className="me-2" />
        <h1 className="h5 m-0">Checklist</h1>
      </Link>

      {/* Sección de listas */}
      <div className="wrap-my-lists">
        {/* Chips scroll horizontal */}
        <div className="wrap-chips-detail">&nbsp;</div>
        <div className="wrap-chips">
          {tags.map((tag) => (
            <Chip
              key={tag.value}
              label={tag.label}
              className={`chips text-nowrap cursor-pointer flex-shrink-0 ${
                selectedTag === tag.value ? "active" : ""
              }`}
              onClick={() => handleTagClick(tag.value)}
              style={{ scrollSnapAlign: "start" }}
            />
          ))}
        </div>
        <MyLists />

        <div className="wrap-new-list">
          <Link to="/crear-lista">
            <button className="btn-new-list">Crear nueva lista</button>
          </Link>
        </div>
      </div>
    </>
  );
}
