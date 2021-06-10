import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";

const initialData = { email: "", password: "" };

export default function Login() {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [formValid, setFormValid] = useState(true);
  const { login } = useContext(GlobalContext);
  const history = useHistory();

  var messages = [];

  useEffect(() => {
    return () => {
      setErrors([]);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      messages.push("Please enter all fields");
    }

    setErrors(messages);
    if (messages.length !== 0) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }

    if (messages.length === 0) {
      login(formData, history);
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
                onChange={handleChange}
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
                onChange={handleChange}
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
