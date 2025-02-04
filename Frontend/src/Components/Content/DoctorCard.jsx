import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./DoctorCard.css"
const DoctorCard = ({button,...props}) => {
  const [role,setRole] = useState("")
  const navigate = useNavigate();
  return (
    <div className="docotr">
    <div className="doctor-details">
      <div className="margin">
        <div className="doctor-name">
          <label>Name:</label>
          <span>Gaurav Kumar</span>
        </div>
        <div className="doctor-name">
          <label>Phone:</label>
          <span>7589745696</span>
        </div>
        <div className="doctor-name">
          <label>Email:</label>
          <span>18gauravkr@gmail.com</span>
        </div>
        {
          role==="Doctor" ? (<div className="doctor-name">
          <label>Speclization:</label>
          <span>Nuro</span>
        </div>):(<div className="doctor-name">
          <div>
          <label>Age:</label>
          <span>22</span>
          </div>
          <div>
          <label>Gender:</label>
          <span>Male</span>
          </div>
          
        </div>)
        }
        
      </div>
    </div>
    <div className="appointment-details">
      <h1>APPOIENTMENT</h1>
      <button type="button" onClick={()=>{navigate("/appointment")}}>{button}</button>
    </div>
  </div>
  )
}

export default DoctorCard