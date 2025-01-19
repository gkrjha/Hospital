import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

import "./Style.css"
const Footer = () => {
    return (
        <footer className='parent'>
            <div className='footer-item'>
                <div className='footer-item-1'>
                    <img src="https://infyhms.sgp1.cdn.digitaloceanspaces.com/638/Graphics.png" alt="Infy HMS" className="img-fluid"></img>
                    <p>
                        Over past 10+ years of experience and skills in various technologies, we built great scalable produc
                    </p>
                </div>
                <div className='footer-item-2'>
                    <h1>Useful Links</h1>
                    <ul>
                        <li>Home</li>
                        <li>Service</li>
                        <li>Doctor</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className='footer-item-3'>
                    <h1>Contact Information</h1>
                    <ul>
                        <li>
                            <i>
                                <FaPhone />
                            </i>
                            <p>+917096336561</p>
                        </li>
                        <li>
                            <i><FaClock /></i>
                            <p>08:00 AM to 21:00 PM</p>
                        </li>
                        <li>

                            <div className='address'>
                                <i><FaLocationDot /></i>
                                <div>
                                    <p>C/303, Atlanta Shopping Mall Sudama</p>
                                    <p>Chowk, Mota Varachha, Surat,</p>
                                    <p>Gujarat 394101</p>
                                </div>

                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='copyright'>
                <hr />
                <h1>Copyright © 2025 All Rights Reserved by HMS</h1>
            </div>
        </footer>
    )
}

export default Footer