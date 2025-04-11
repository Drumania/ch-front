import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import ListaThumb from "@/components/ListaThumb";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const query = searchParams.get("query") || "";
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros desde la URL
  const urlTamanos = searchParams.get("tamanos")?.split(",") || [];
  const urlOrden = searchParams.get("orden") || "recientes";

  const [tamanos, setTamanos] = useState(urlTamanos);
  const [orden, setOrden] = useState(urlOrden);

  // Sincronizar cambios de filtros a la URL
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("query", query);
    if (tamanos.length > 0) params.set("tamanos", tamanos.join(","));
    if (orden) params.set("orden", orden);
    setSearchParams(params);
  }, [tamanos, orden]);

  // Lógica de búsqueda
  useEffect(() => {
    const buscar = async () => {
      if (query.trim().length < 3) {
        setResultados([]);
        return;
      }

      setLoading(true);
      try {
        const ref = collection(db, "listas_publicas");
        const snap = await getDocs(ref);

        let coincidencias = snap.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((lista) =>
            lista.nombre?.toLowerCase().includes(query.toLowerCase())
          )
          .filter((lista) => {
            const count = lista.items?.length || 0;
            if (tamanos.length === 0) return true;

            return (
              (tamanos.includes("chiquita") && count <= 10) ||
              (tamanos.includes("mediana") && count > 10 && count <= 50) ||
              (tamanos.includes("grande") && count > 50)
            );
          });

        if (orden === "recientes") {
          coincidencias.sort(
            (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
          );
        } else if (orden === "populares") {
          coincidencias.sort(
            (a, b) => (b.popularidad || 0) - (a.popularidad || 0)
          );
        }

        setResultados(coincidencias);
      } catch (error) {
        console.error("Error en búsqueda:", error);
      } finally {
        setLoading(false);
      }
    };

    buscar();
  }, [query, tamanos, orden]);

  const handleCheckboxChange = (value) => {
    setTamanos((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between">
        <h2 className="mb-3">Resultados para: “{query}”</h2>
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-outline-secondary shadow-sm"
            type="button"
            onClick={() => setMostrarFiltros((prev) => !prev)}
          >
            {mostrarFiltros ? "Ocultar filtros" : "Ver filtros"}
          </button>
        </div>
      </div>
      {/* Filtros */}
      {mostrarFiltros && (
        <form className="row g-3 mb-4 align-items-end">
          <div className="col-md-6">
            <label className="form-label">Tamaño de lista</label>
            <div className="d-flex gap-3 flex-wrap">
              {["chiquita", "mediana", "grande"].map((tam) => (
                <div className="form-check" key={tam}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={tam}
                    checked={tamanos.includes(tam)}
                    onChange={() => handleCheckboxChange(tam)}
                  />
                  <label className="form-check-label" htmlFor={tam}>
                    {tam === "chiquita" && "Chiquita (≤ 10)"}
                    {tam === "mediana" && "Mediana (11–50)"}
                    {tam === "grande" && "Grande (> 50)"}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-3">
            <label className="form-label">Ordenar por</label>
            <select
              className="form-select"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="recientes">Más recientes</option>
              <option value="populares">Más populares</option>
            </select>
          </div>
        </form>
      )}

      {/* Resultados */}
      {loading ? (
        <p>Buscando...</p>
      ) : resultados.length === 0 ? (
        <p>No se encontraron listas.</p>
      ) : (
        <ul className="d-flex flex-wrap gap-3 list-unstyled">
          {resultados.map((lista) => (
            <li key={lista.id}>
              <ListaThumb
                lista={lista}
                onVer={() => console.log("ver", lista)}
                onAgregar={() => console.log("agregar", lista)}
                agregada={false}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
