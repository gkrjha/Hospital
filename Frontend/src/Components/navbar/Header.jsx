import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        setUsername(user?.name);
      }
    };

    if (isLoggedIn && localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUsername(user?.name);
    }
    console.log(username);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
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

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="nav-header">
      <div className="nav-logo">
        <Link to="/">
          <img
            src="https://infyhms.sgp1.cdn.digitaloceanspaces.com/638/Graphics.png"
            alt="Infy HMS"
          />
        </Link>
      </div>
      <div className="nav-item">
        <ul className="nav-list-item">
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
      </div>
      <div className="nav-button">
        {isLoggedIn ? (
          <div className="dropdown">
            <button onClick={toggleDropdown} style={{fontWeight:600, padding:"20px", borderRadius:"50%"}}>
              {username ? username.charAt(0) : "User"
}
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout} style={{}}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
