import React from "react";

export default function Dashboard(props) {
  if (props.location.state) {
    return (
      <div>Welcome {props.location.state.userName}. You have loged in.</div>
    );
  } else {
    return <div>Please login</div>;
  }
}
