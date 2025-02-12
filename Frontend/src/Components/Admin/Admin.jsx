import React, { useEffect, useState } from "react";
import "./Admin.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "./Card";
import axios from "axios";
import Header from "../navbar/Header";

const Admin = () => {
  const [Doctor, setDoctor] = useState(0);
  const [Patient, setPatient] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [doctorRes, patientRes] = await Promise.all([
          axios.get("http://localhost:8080/api/user/count", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
          axios.get("http://localhost:8080/api/user/count/patient", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
        ]);
        setDoctor(doctorRes.data );
        setPatient(patientRes.data );
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
    <Header />
    <div className="admin-contain">
      <div className="admin-item">
        <h2>ADMIN PANEL</h2>
        <div className="Add-buttons">
          <button>
            <Link to="/signup">+ ADD MEMBER</Link>
          </button>
        </div>
      </div>
      <div className="user-card">
        <Card role="Doctor" Count={Doctor} click={() => navigate("/doctor_detail")} />
        <Card role="Patient" Count={Patient} click={() => navigate("/patient_detail")} />
      </div>
    </div>
    </>
  );
};

export default Admin;
