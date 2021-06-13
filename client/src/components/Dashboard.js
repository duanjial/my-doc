import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import Home from "./Home";

export default function Dashboard(props) {
  const { isLogin, userName } = useContext(GlobalContext);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axios
  //       .get("http://localhost:3001/getUser", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       })
  //       .then((res) => {
  //         if (res.data.user) {
  //           // const { id, name } = res.data.user;
  //           setIsLogin(true);
  //           setUsername(res.data.user.name);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  var dashBoard;
  if (isLogin) {
    dashBoard = (
      <div>
        <h1>Welcome {userName}</h1>
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
