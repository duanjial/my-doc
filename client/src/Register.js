import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState([]);
  const [formValid, setFormValid] = useState(true);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  var messages = [];

  useEffect(() => {
    return () => {
      setName("");
      setEmail("");
      setPassword("");
      setPassword2("");
      setErrors([]);
      setRegisterError("");
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password || !password || !password2) {
      messages.push("Please enter all fields");
    }

    if (password !== password2) {
      messages.push("Passwords do not match");
    }

    if (password.length < 6) {
      messages.push("Password must be at least 6 characters");
    }

    setErrors(messages);
    if (messages.length !== 0) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }

    if (messages.length === 0) {
      axios
        .post("http://localhost:3001/register", {
          name,
          email,
          password,
          password2,
        })
        .then((res) => {
          setRegisterSuccess(true);
          setRegisterError("");
        })
        .catch((err) => {
          setRegisterError(err.response.data.msg);
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
  } else if (registerError) {
    errorMsg = (
      <div className="alertContainer alert alert-danger">
        <span>
          {registerError}
          <br />
        </span>
      </div>
    );
  }

  var register;
  if (registerSuccess) {
    register = (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: { userName: name },
        }}
      />
    );
  } else {
    register = (
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body">
            <h1 className="text-center mb-3">
              <i className="fas fa-user-plus"></i> Register
            </h1>
            {errorMsg}
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  placeholder="Create Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
            </form>
            <button
              type="button"
              className="formBtn btn btn-primary btn-lg"
              onClick={(e) => handleSubmit(e)}
            >
              Register
            </button>
            <p className="lead mt-4">
              Have An Account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return <>{register}</>;
}
