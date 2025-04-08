import { Link } from "react-router-dom";
import Categorys from "@/pages/category/Categorys";

export default function Home() {
  return (
    <div className="panel ">
      <div className="row pt-3 px-5 pb-5">
        <div className="col-12">Home</div>
        <Link to="/register">¿No tenés cuenta? Registrate</Link>
        <Categorys />
      </div>
    </div>
  );
}
