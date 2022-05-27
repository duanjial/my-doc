import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { userName, logout } = useContext(GlobalContext);
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(localStorage.getItem("userName"));
    }
  }, [userName]);

  const handleLogout = () => {
    logout();
    setUser();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          MyDoc
        </Link>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/dashboard">
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          {user ? (
            <span className="greeting">Welcome, {user}</span>
          ) : (
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          )}
          {user ? (
            <button className="btn btn-secondary" onClick={() => handleLogout()}>
              Logout
            </button>
          ) : (
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
