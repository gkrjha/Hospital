import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Patient.css";  
import Header from "../navbar/Header";

const Patientlist = () => {
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    const patientDetail = async () => {
      
      const token = localStorage.getItem('token')
      const response = await axios.get("http://localhost:8080/api/user/patient",{
        
          headers: {
              Authorization: `Bearer ${token}`,
          },
      
      });
      console.log(response);
      setPatient(response.data);
    };
    patientDetail();
  }, []);

  const deleteUser = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:8080/api/user/${id}`);
      setPatient(patient.filter((item) => item.UniqueId !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <>
    <Header />
    <div className="patient-list-container">
      <div className="patient-list-header">
        <li>Name</li>
        <li>Email</li>
        <li>Phone Number</li>
        <li>Action</li>
      </div>
      {patient.map((item, index) => (
        <div key={index} className="patient-card">
          <h1>{item.name}</h1>
          <h1>{item.email}</h1>
          <h1>{item.phone}</h1>
          <button className="delete-button" onClick={() => deleteUser(item.UniqueId)}>
            Delete
          </button>
        </div>
      ))}
    </div>
    </>
  );
};

export default Patientlist;
