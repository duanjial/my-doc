import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import Home from "./Home";

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

  var dashBoard;
  if (user) {
    dashBoard = (
      <div>
        <h1>Welcome {user}</h1>
        <Home />
      </div>
    );
  } else {
    dashBoard = (
      <div>
        <h1>Please Login / Register first</h1>
      </div>
    );
  }
  return dashBoard;
}
