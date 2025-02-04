import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className='nav-header'>
      <div className='nav-logo'>
        <Link to='/'>
          <img src='https://infyhms.sgp1.cdn.digitaloceanspaces.com/638/Graphics.png' alt='Infy HMS' />
        </Link>
      </div>
      <div className='nav-item'>
        <ul className='nav-list-item'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/doctor">Doctor</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className='nav-button'>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to='/login'>
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
