import { Link } from "react-router-dom";
import ListasPorCategoria from "@/pages/ListasPorCategoria";

export default function Home() {
  return (
    <div className="panel ">
      <div className="row pt-3 px-5 pb-5">
        <ListasPorCategoria />
      </div>
    </div>
  );
}
