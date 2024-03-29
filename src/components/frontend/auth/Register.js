import axios from "axios";
import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Register() {
  const Navigate = useNavigate();

  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Réussi", res.data.message, "success");
          Navigate("/");
        } else {
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={registerInput.name}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {registerInput.error_list.name}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={registerInput.email}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {registerInput.error_list.email}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={registerInput.password}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {registerInput.error_list.password}
                    </span>
                  </div>
                  <div>
                    <p className="text-warning">
                      {" "}
                      * Bonus de 50 € à l'inscription
                    </p>
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
