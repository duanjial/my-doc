import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Dashboard(props) {
  const { isLogin, userName, setIsLogin, setUsername } =
    useContext(GlobalContext);

  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
      await axios
        .get("http://localhost:3001/getUser")
        .then((res) => {
          if (res.data.user) {
            const { id, name } = res.data.user;
            if (!unmounted) {
              setIsLogin(true);
              setUsername(name);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
    return () => {
      unmounted = true;
    };
  }, []);

  var dashBoard;
  if (isLogin) {
    dashBoard = <div>Welcome {userName}</div>;
  } else {
    dashBoard = <div>Please login</div>;
  }
  return dashBoard;
}
