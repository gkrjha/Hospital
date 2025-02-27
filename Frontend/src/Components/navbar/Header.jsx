import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import "./Navbar.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUserState = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      setIsLoggedIn(!!token);
      setUsername(user ? JSON.parse(user)?.name || "User" : null);
    };

    updateUserState();
    window.addEventListener("storage", updateUserState);

    return () => window.removeEventListener("storage", updateUserState);
  }, []);

  const handleLogout = async () => {
    try {
      document.body.click(); // Closes dropdown before updating state

      await axios.post(
        "http://localhost:8080/api/user/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUsername(null);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="nav-header">
      <div className="nav-logo">
        <Link to="/">
          <img
            src="https://infyhms.sgp1.cdn.digitaloceanspaces.com/638/Graphics.png"
            alt="Infy HMS"
          />
        </Link>
      </div>

      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/doctor">Doctor</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <div className="nav-auth">
        {isLoggedIn ? (
          <Dropdown>
            <Dropdown.Toggle className="profile-button">
              {username || "U"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/login">
            <button className="login-button">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
