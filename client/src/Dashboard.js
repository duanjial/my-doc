import React from "react";

export default function Dashboard(props) {
  return <div>Welcome {props.location.state.userName}. You have loged in.</div>;
}
