import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <nav className="navbar__header">
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link" to="/allnotes">
            All Notes
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/app">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/alluser">
            All User
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Logout">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
