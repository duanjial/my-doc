import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Home from "./Home";
import Login from "./Login";

export default function Dashboard(props) {
  const { userName } = useContext(GlobalContext);
  const [user, setUser] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setUser(localStorage.getItem("userName"));
    } else {
      setUser();
    }
  }, [userName, token]);

  return user ? (
    <div>
      <h1>Welcome 
        <i className="fa-solid fa-user-astronaut dashboard-avatar"></i>
        {user}
      </h1>
      <Home />
    </div>
  ) : (
    <Login />
  );
}
