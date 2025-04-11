import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (busqueda.trim().length >= 3) {
      navigate(`/buscar?query=${encodeURIComponent(busqueda.trim())}`);
    }
  };

  return (
    <div className="search-component w-100">
      <div className="p-inputgroup searchbar-container">
        <InputText
          className="searchbar-input"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar Listas..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <span
          className="p-inputgroup-addon searchbar-icon cursor-pointer"
          onClick={handleSearch}
        >
          <i className="pi pi-search" />
        </span>
      </div>
    </div>
  );
}
