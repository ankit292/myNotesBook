import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertState from "../context/alert/alertContext";
// import axios from "axios";
export default function Login() {
  const [credentiol, setCredentiol] = useState({
    email: "",
    password: "",
  });
  const alertContext = useContext(AlertState);
  const { showAlert } = alertContext;
  let history = useNavigate();
  const host = "http://localhost:5000/";
  const logFormSubmit = async (e) => {
    e.preventDefault();
    // axios
    //   .post(`${host}api/auth/login`)
    //   .then((response) => {
    //     const token = response.json();
    //     console.log(token);
    //     localStorage.setItem("token", token.authtoken);
    //   })
    //   .catch((err) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });

    const response = await fetch(`${host}api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: credentiol.email,
        password: credentiol.password,
      }),
    });
    let json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      showAlert("Logged in Successfully", "success");
      history("/");
      
    } else {
      showAlert("Inavalid creadential", "error");
    }
  };
  const onChangeLogForm = (e) => {
    setCredentiol({ ...credentiol, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form onSubmit={logFormSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            autoComplete="email"
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentiol.email}
            onChange={onChangeLogForm}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentiol.password}
            onChange={onChangeLogForm}
            required
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
