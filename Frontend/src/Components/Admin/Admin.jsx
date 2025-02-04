import React, { useEffect, useState} from "react";
import "./Admin.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "./Card";
import axios from "axios"



const Admin = () => {
  const [Doctor,setDoctor]= useState("");
  const [Patient,setPatient]= useState("");
  const navigate = useNavigate()
  useEffect(()=>{
    const countDoctor =async()=>{
      const response = await axios.get("http://localhost:8080/api/user/count")
      setDoctor(response.data)
      const countpatient = await axios.get("http://localhost:8080/api/user/count/patient")
      setPatient(countpatient.data)
    }

    
    countDoctor()
  },[])
  return (
    
    <div className="admin-contain">
   
      <div className="admin-item">
        <h2>ADMIN_PANEL</h2>
        <div className="Add-buttons">
         <button><Link to="/signup">+ ADD MEMBER</Link></button>
        </div>
      </div>
      <div className="user-card">
       <Card role="Doctor" Count={Doctor} click={()=>(navigate("/doctor_detail"))}/>
       <Card role="Patient" Count={Patient} click={()=>(navigate("/patient_detail"))}/>
      </div>
    </div>
  );
};

export default Admin;


