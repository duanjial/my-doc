import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Dashboard(props) {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
      await axios
        .get("http://localhost:3001/getUser")
        .then((res) => {
          if (res.data.user) {
            console.log(res.data.user);
            const { id, name } = res.data.user;
            if (!unmounted) {
              setUser(name);
              setLogin(true);
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

  return <div>{login ? <h1>Welcome</h1> : <Redirect to="/login" />}</div>;
}
