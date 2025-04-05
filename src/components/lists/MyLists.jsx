// MyLists.jsx
import ThumbList from "./ThumbList";

export default function MyLists() {
  const items = [
    {
      id: 1,
      title: "100 cosas para hacer en Argentina",
      highlight: "Argentina",
      image: "https://placehold.co/50x50",
    },
    {
      id: 2,
      title: "10 lugares para visitar en Campana",
      highlight: "Campana",
      image: "https://placehold.co/50x50",
    },
    {
      id: 3,
      title: "10 Imprescindibles de Paris",
      highlight: "Paris",
      image: "https://placehold.co/50x50",
    },
    {
      id: 4,
      title: "100 Restaurantes en Capital Federal, Argentina",
      highlight: "Capital Federal, Argentina",
      image: "https://placehold.co/50x50",
    },
    {
      id: 5,
      title:
        "100 cosas para hacer en New World si ya terminaste la misión principal y querés seguir jugando",
      highlight: "New World",
      image: "https://placehold.co/50x50",
    },
    {
      id: 6,
      title: "100 cosas para hacer en Bariloche con nieve o sin ella",
      highlight: "Bariloche",
      image: "https://placehold.co/50x50",
    },
    {
      id: 7,
      title: "100 planes familiares en Argentina para todas las edades",
      highlight: "Argentina",
      image: "https://placehold.co/50x50",
    },
  ];

  return (
    <>
      <ul className="list-unstyled">
        {items.map((item) => (
          <ThumbList key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}
