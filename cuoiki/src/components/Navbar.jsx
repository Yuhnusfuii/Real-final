import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth";
import "./Navbar.css";
import { APP_NAME } from "../config"; 

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const LinkItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "nav-link" + (isActive ? " nav-link-active" : "")
      }
      onClick={() => setOpen(false)}
    >
      {children}
    </NavLink>
  );

  return (
    <header className="nav">
      <div className="nav-inner">
        
        
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          {APP_NAME} {/* 👈 dùng từ ENV */}
        </NavLink>


        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <nav className={"menu" + (open ? " menu-open" : "")}>
          <LinkItem to="/">Home</LinkItem>
          <LinkItem to="/about">About</LinkItem>
          <LinkItem to="/dashboard">Dashboard</LinkItem>

          {!isAuthenticated() ? (
            <>
              <LinkItem to="/login">Login</LinkItem>
              <LinkItem to="/register">Register</LinkItem>
            </>
          ) : (
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
