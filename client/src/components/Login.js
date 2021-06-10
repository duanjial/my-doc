import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [formValid, setFormValid] = useState(true);
  const { setIsLogin } = useContext(GlobalContext);
  const history = useHistory();

  var messages = [];

  useEffect(() => {
    return () => {
      setEmail("");
      setPassword("");
      setErrors([]);
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      messages.push("Please enter all fields");
    }

    setErrors(messages);
    if (messages.length !== 0) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }

    if (messages.length === 0) {
      axios
        .post("http://localhost:3001/login", {
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setLoginError("");
          setIsLogin(true);
          history.push("/dashboard");
        })
        .catch((err) => {
          setLoginError(err.response.data.message);
        });
    }
  }

  var errorMsg;
  if (!formValid) {
    errorMsg = (
      <div className="alertContainer alert alert-danger">
        {errors.map((error, idx) => (
          <span key={idx}>
            {error}
            <br />
          </span>
        ))}
      </div>
    );
  } else if (loginError) {
    errorMsg = (
      <div className="alertContainer alert alert-danger">
        <span>
          {loginError}
          <br />
        </span>
      </div>
    );
  }

  return (
    <div className="row mt-5">
      <div className="col-md-6 m-auto">
        <div className="card card-body">
          <h1 className="text-center mb-3">
            <i className="fas fa-sign-in-alt"></i> Login
          </h1>
          {errorMsg}
          <form action="/users/login" method="POST">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
          <button
            className="formBtn btn btn-lg btn-primary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </button>
          <p className="lead mt-4">
            No Account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
