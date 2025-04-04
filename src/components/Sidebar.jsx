import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
    <h4>Mi App</h4>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/" className="nav-link text-white">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/lists" className="nav-link text-white">
          Lists
        </Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
