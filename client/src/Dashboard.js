import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUser")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // const fetchData = async () => {
    //   await axios
    //     .get("http://localhost:3001/getUser")
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
    // fetchData();
  }, []);
  return <div>Welcome . You have loged in.</div>;
}
