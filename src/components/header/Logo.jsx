import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="img-logo d-flex align-items-center mb-4">
      <img src="/img/logo.png" alt="Checklist" className="me-2" />
      <h1 className="h5 m-0">Checklist</h1>
    </Link>
  );
}
