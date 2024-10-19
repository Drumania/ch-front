import { useState, useEffect } from "react";
import fetchdata from "../../services/fetchdata";

export default function Lists() {
  const [listas, setListas] = useState([]);

  const getLists = async () => {
    try {
      const response = await fetchdata("/lists");
      setListas(response.data.data);
    } catch (error) {
      console.error("Error al obtener las listas:");
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <div>
      <h1>Listas</h1>
      <ul>
        {listas?.map((lista) => (
          <li key={lista.id}>
            <div className="box-list-items">{lista.title_show}</div>
            <div className="box-list-check">Check</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
