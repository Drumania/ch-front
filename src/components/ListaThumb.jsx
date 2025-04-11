import { useState } from "react";

export default function ListaThumb({ lista, onVer, onAgregar, agregada }) {
  const [imgSrc, setImgSrc] = useState(lista.imagen || "");

  const handleImgError = () => {
    setImgSrc("https://placehold.co/600x400");
  };

  return (
    <div className="lista-thumb">
      {/* Imagen */}
      <div className="lista-thumb-img">
        <img
          src={imgSrc}
          alt={lista.nombre}
          onClick={() => onVer(lista)}
          onError={handleImgError}
        />
      </div>

      {/* Contenido */}
      <div className="lista-thumb-content">
        <h3 onClick={() => onVer(lista)}>{lista.nombre}</h3>
        <p className="categoria">{lista.categoria}</p>
        <p>{lista.items?.length ?? 0} ítems</p>

        <div className="lista-thumb-actions">
          <button onClick={() => onVer(lista)}>👁 Ver</button>

          {agregada ? (
            <button className="btn btn-secondary" disabled>
              ✅ Ya agregada
            </button>
          ) : (
            <button onClick={() => onAgregar(lista)}>➕ Agregar</button>
          )}
        </div>
      </div>
    </div>
  );
}
