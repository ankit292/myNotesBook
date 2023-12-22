import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertState from "../context/alert/alertContext";

export default function Signup(props) {
  const [credentiol, setCredentiol] = useState({
    name: "",
    email: "",
    password: "",
  });
  const alertContext = useContext(AlertState);
  const {showAlert} = alertContext;
  let history = useNavigate();
  const host = 'http://localhost:5000/'
  const signupFormSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch(`${host}api/auth/createuser`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({name:credentiol.name, email: credentiol.email, password: credentiol.password }),
      });
      const json = await response.json();

      if(json.success){
         localStorage.setItem('token', json.authToken);
        showAlert('Account created Successfully','success')
         history('/')
      }else{
        showAlert('Inavalid creadential', 'danger')
      }
  };
  const onChangeSignupForm = (e) => {
    setCredentiol({ ...credentiol, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form onSubmit={signupFormSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            required
            onChange={onChangeSignupForm}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            autoComplete="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            required
            onChange={onChangeSignupForm}
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
            required
            minLength={5}
            onChange={onChangeSignupForm}
            autoComplete="new-password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            required
            minLength={5}
            onChange={onChangeSignupForm}
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
