import React, { useState } from "react";
import "../assets/styles/login.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [checkValidate, setValidate] = useState({
    name: false,
    email: false,
    password: false,
  });
  const dataFormCopy = { ...dataForm };

  const handleOnChange = (e) => {
    dataFormCopy[e.target.name] = e.target.value;
    setDataForm(dataFormCopy);
  };

  const handleSubmit = (e) => {
    let problem = 0;
    e.preventDefault();
    if (dataForm.password.length < 6) {
      setValidate((prev) => ({ ...prev, password: true }));
      problem++;
    } else {
      setValidate((prev) => ({ ...prev, password: false }));
    }
    if (dataForm.email.indexOf("@") === -1) {
      setValidate((prev) => ({ ...prev, email: true }));
      problem++;
    } else {
      setValidate((prev) => ({ ...prev, email: false }));
    }
    if (dataForm.name === "") {
        setValidate((prev) => ({ ...prev, name: true }));
        problem++;
      } else {
        setValidate((prev) => ({ ...prev, name: false }));
      }
    if (!problem) console.log(dataForm);
  };

  return (
    <div className="login-container d-flex flex-column justify-content-center">
      <div className="login-form p-5 pt-4 rounded-2 mx-auto bg-white">
        <form>
          <h1 className="text-center text-primary">Register</h1>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={handleOnChange}
                name="name"
              />
              {checkValidate.name && (
                <small className="text-danger">Missing name</small>
              )}
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                onChange={handleOnChange}
                name="email"
              />
              {checkValidate.email && (
                <small className="text-danger">Email invalidate</small>
              )}
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={handleOnChange}
                name="password"
              />
              {checkValidate.password && (
                <small className="text-danger">
                  Password must contain at least 6 characters
                </small>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <small className="">
                Have account? <Link to="/login">Login</Link>
              </small>
            </div>
            <button
              className="btn btn-primary p-1 w-50 mx-auto"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
