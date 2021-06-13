import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from "react-router-dom";

const initialState = { name: "", email: "", password: "", password2: "" };

export default function Register() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [formValid, setFormValid] = useState(true);
  const { register, error_msg } = useContext(GlobalContext);
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
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.password2
    ) {
      messages.push("Please enter all fields");
    }

    if (formData.password !== formData.password2) {
      messages.push("Passwords do not match");
    }

    if (formData.password.length < 6) {
      messages.push("Password must be at least 6 characters");
    }

    setErrors(messages);
    if (messages.length !== 0) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }

    if (messages.length === 0) {
      register(formData, history);
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
  } else if (error_msg) {
    errorMsg = (
      <div className="alertContainer alert alert-danger">
        <span>
          {error_msg}
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
                onChange={handleChange}
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
                placeholder="Create Password"
                onChange={handleChange}
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
                onChange={handleChange}
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
