import React from 'react'
import { Link } from "react-router-dom"
import "./Style.css"
const Header = () => {
    return (
        <header className='main-container'>
                    <div className='container-item'>
                        <div className='logo'>
                            <a >
                                <img src="https://infyhms.sgp1.cdn.digitaloceanspaces.com/638/Graphics.png" alt="Infy HMS" className="img-fluid"></img>
                            </a>
                        </div>
                        <nav className='navbar'>
                           
                            <div className='nav-item'>
                                <ul>
                                    <li>Home</li>
                                    <li>Services</li>
                                    <li>Doctor</li>
                                    <li>Contact</li>
                                    <li>About</li>
                                    <li>Our Features</li>
                                    <li>English</li>
                                </ul>
                                <div className='nav-item'>
                                    <a href="" className='login'>
                                        Login
                                    </a>
                                    <a href="">
                                        Book Appointment
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>
        </header >
    )
}

export default Header