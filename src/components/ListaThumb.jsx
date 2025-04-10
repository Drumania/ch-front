export default function ListaThumb({ lista, onVer, onAgregar }) {
  return (
    <div className="lista-thumb">
      {/* Imagen */}
      <div className="lista-thumb-img">
        <img
          src={lista.imagen || "https://via.placeholder.com/400x200"}
          alt={lista.nombre}
        />
      </div>

      {/* Contenido */}
      <div className="lista-thumb-content">
        <div className="lista-thumb-header">
          <h3>{lista.nombre}</h3>
          <span className="lista-thumb-categoria">{lista.categoria}</span>
        </div>

        <p className="lista-thumb-items">{lista.items?.length ?? 0} ítems</p>

        {lista.descripcion && (
          <p className="lista-thumb-descripcion">{lista.descripcion}</p>
        )}

        <div className="lista-thumb-actions">
          <button onClick={() => onVer(lista)}>👁 Ver</button>
          <button onClick={() => onAgregar(lista)}>➕ Agregar</button>
        </div>
      </div>
    </div>
  );
}
