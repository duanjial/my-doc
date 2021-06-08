import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const { isLogin, setIsLogin, userName, setUsername } =
    useContext(GlobalContext);

  const logout = () => {
    axios
      .get("http://localhost:3001/logout")
      .then((res) => {
        setIsLogin(false);
        setUsername("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          MyDoc
        </Link>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="#">
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                About
              </Link>
            </li>
          </ul>
          {isLogin ? (
            <span>Welcome, {userName}</span>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
          {isLogin ? (
            <button className="btn btn-primary" onClick={() => logout()}>
              Logout
            </button>
          ) : (
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
