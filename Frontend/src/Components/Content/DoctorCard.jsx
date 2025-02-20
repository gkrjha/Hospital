import React from 'react';
import "./DoctorCard.css"
import { useNavigate } from 'react-router-dom';
const DoctorCard = ({ doctor, button,doctorid  }) => {
  const navigate = useNavigate();
  console.log(doctorid);
  return (
    <div className="doctor">
      <div className="doctor-details">
        <div className="margin">
          {
            doctor.role =="Doctor" ?(<>DOCTOR</>):(<>PATIENT</>)
          }
          <div className="doctor-name">
            <label>Name:</label>
            <span>{doctor.name}</span>
          </div>
          <div className="doctor-name">
            <label>Phone:</label>
            <span>{doctor.phone}</span>
          </div>
          <div className="doctor-name">
            <label>Email:</label>
            <span>{doctor.email}</span>
          </div>
        </div>
      </div>
      
      <div className="appointment-details">
        <h1>APPOINTMENT</h1>
        {
          doctor.role =="Doctor"?(<><button type="button" onClick={() => { navigate("/appointlist",{
            state:{DoctorID:doctorid}
          }) }}>{button}</button></>):(<><button type="button" onClick={() => { navigate("/appointment") }}>{button}</button></>)
        }
        
      </div>
    </div>
  );
};

export default DoctorCard;


