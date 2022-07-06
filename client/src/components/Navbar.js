import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { userName, logout, socket } = useContext(GlobalContext);
  const [user, setUser] = useState();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setUser(localStorage.getItem("userName"));
    }else {
      setUser();
    }
  }, [userName, token]);

  useEffect(() => {
    socket?.on("get-notification", (data) => {
      console.log(data);
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const handleLogout = () => {
    logout();
    setNotifications([]);
    socket.disconnect();
    setUser();
  };

  const handleRead = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
          {user && (
            <div className="notification-container">
              <Link className="notification" to="#" onClick={()=>setShowNotifications(notifications.length > 0 && !showNotifications)}>
                <i className="fa-solid fa-bell bell-notification"></i>
                {notifications.length > 0 && (
                  <div className="counter">{notifications.length}</div>
                )}
              </Link>
              {showNotifications && (
                <div className="notifications list-group">
                  {notifications.map(notification => (
                    <span className="list-group-item list-group-item-action active" key={notification.doc_id}>{notification.sender} has shared
                    <Link to={`/documents/${notification.doc_id}`} onClick={()=>setShowNotifications(false)}>&nbsp;{notification.doc_name}</Link>
                    &nbsp;with you!</span>
                  ))}
                  <button type="button" className="btn btn-outline-light n-button" onClick={handleRead}>Mark as read</button>
                </div>
              )}
            </div>
          )}
          {user ? (
            <Link to="/profile" className="greeting">
              <i className="fa-solid fa-user-astronaut avatar"></i>
              {user}
            </Link>
            // <span className="greeting">{user}</span>
          ) : (
            <Link to="/login" className="btn btn-secondary btn-login">
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
