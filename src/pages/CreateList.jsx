// src/pages/CreateList.jsx
import { useState } from "react";
import { auth, db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreateList() {
  const [listName, setListName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateList = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        setMessage("Debés iniciar sesión.");
        return;
      }

      const listaRef = await addDoc(collection(db, "listas"), {
        nombre: listName,
        userId: user.uid,
        categorias: [],
        createdAt: new Date(),
      });

      navigate("/"); // Vuelve al home o donde quieras
    } catch (error) {
      setMessage("Error al crear la lista: " + error.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Crear nueva lista</h2>
      <form onSubmit={handleCreateList}>
        <input
          type="text"
          placeholder="Nombre de la lista"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
        />
        <br />
        <button type="submit">Crear</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
