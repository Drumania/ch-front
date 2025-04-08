import { useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CargarListaPublicaViajes() {
  useEffect(() => {
    const viajes = [
      "Machu Picchu (Perú)",
      "Tokio (Japón)",
      "Nueva York (EE.UU)",
      "Roma (Italia)",
      "París (Francia)",
      "Petra (Jordania)",
      "El Cairo (Egipto)",
      "Santorini (Grecia)",
      "Islandia (Auroras Boreales)",
      "Buenos Aires (Argentina)",
    ];

    const cargar = async () => {
      const items = viajes.map((nombre) => ({
        nombre,
        checked: false, // por defecto false
      }));

      await addDoc(collection(db, "listas_publicas"), {
        nombre: "10 viajes que tenés que hacer en tu vida",
        categoria: "Viajes",
        creadorId: "admin",
        createdAt: serverTimestamp(),
        items,
        popularidad: 0, // opcional para ranking
        descripcion: "Una lista esencial para los amantes de los viajes ✈️🌍",
      });

      console.log("✅ Lista pública 'Viajes' cargada");
    };

    cargar();
  }, []);

  return <p>Cargando lista pública de viajes...</p>;
}
