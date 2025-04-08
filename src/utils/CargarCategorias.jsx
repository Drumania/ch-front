// src/utils/CargarCategorias.jsx
import { useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function CargarCategorias() {
  useEffect(() => {
    const categorias = [
      { nombre: "Anime", icono: "🎌", orden: 1, activa: true },
      { nombre: "Películas", icono: "🎬", orden: 2, activa: true },
      { nombre: "Gaming", icono: "🎮", orden: 3, activa: true },
      { nombre: "Aprender", icono: "📚", orden: 4, activa: true },
      { nombre: "Viajes", icono: "✈️", orden: 5, activa: true },
      { nombre: "Lugares", icono: "🌍", orden: 6, activa: true },
      { nombre: "Lifestyle", icono: "💅", orden: 7, activa: true },
      { nombre: "Casa", icono: "🏡", orden: 8, activa: true },
      { nombre: "Salud", icono: "💊", orden: 9, activa: true },
      { nombre: "Tecnología", icono: "💻", orden: 10, activa: true },
      { nombre: "Libros", icono: "📖", orden: 11, activa: true },
      { nombre: "Música", icono: "🎵", orden: 12, activa: true },
      { nombre: "Trabajo", icono: "🧑‍💼", orden: 13, activa: true },
      { nombre: "Series", icono: "📺", orden: 14, activa: true },
      { nombre: "Comida", icono: "🍕", orden: 15, activa: true },
      { nombre: "Fitness", icono: "🏋️‍♂️", orden: 16, activa: true },
      { nombre: "Proyectos", icono: "🧠", orden: 17, activa: true },
    ];

    const cargarCategorias = async () => {
      const ref = collection(db, "categorias");
      for (const cat of categorias) {
        await addDoc(ref, cat);
        console.log("✔️ Categoría agregada:", cat.nombre);
      }
      console.log("✅ ¡Todas las categorías fueron cargadas con éxito!");
    };

    cargarCategorias();
  }, []);

  return <p>Cargando categorías... revisá la consola 🔥</p>;
}
