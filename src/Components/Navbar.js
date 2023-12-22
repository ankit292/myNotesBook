import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const locationPath = useLocation();
  const [pathLocation, setPathLocation] = useState(locationPath);
  let history = useNavigate();
  useEffect(()=>{
    setPathLocation(locationPath.pathname);
  },[locationPath])
  const handlelogOut = ()=>{
    localStorage.removeItem("token");
    history("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className={`navbar-brand ${pathLocation === "/"? "active": ''}`}  to="/">
          myNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <NavLink
            style={({ isActive, isPending }) => {
                return {
                color: isActive ? "red" : "inherit",
                };
            }}
            className={({ isActive, isPending }) => {
                return isActive ? "active" : isPending ? "pending" : "";
            }}
            /> */}
              <Link className={`nav-link ${pathLocation === "/"? "active": ''}`} to="/" >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${pathLocation === "/about"? "active": ''}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            {!localStorage.getItem('token') ?
            <div>
            <Link className="btn btn-outline-success mx-2" type="submit" to={'/login'}>
            Login
            <i className="fa-solid fa-right-to-bracket ms-1"></i>
          </Link>
          <Link className="btn btn-outline-success mx-2" type="submit" to={'/signup'}>
            Signup
          <i className="fa-solid fa-user-plus ms-1"></i>
          </Link></div>: <Button className="btn btn-danger mx-2" type="submit" onClick={handlelogOut}>
            Logout
            <i class="fa-solid fa-right-from-bracket ms-1"></i>
          </Button>
            }
            
          </form>
        </div>
      </div>
    </nav>
  );
}
