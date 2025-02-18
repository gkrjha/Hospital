import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import Header from "../navbar/Header";
import { jwtDecode } from "jwt-decode";

const Appointment = () => {
  const [specialization, setSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]); 
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [user, setUser] = useState(null);
  const [isAppointmentDetails, setIsAppointmentDetails] = useState(false); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const users = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (users) {
      setUser(users);
    }
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/doctor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctors(response.data); 
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [token]);

  const handleAppointmentSubmission = async () => {
    if (!appointmentDate || !appointmentTime || !selectedDoctor) {
      alert("Please fill all the details.");
      return;
    }

    const value = {
      user_ID: user?.UniqueId,
      DoctorId: selectedDoctor?.DoctorID,
      date: appointmentDate,
      time: appointmentTime, 
    };
    
    try {
      const response = await axios.post(
        "http://localhost:8080/api/appoint",
        value,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Appointment booked:", response.data);
      alert("Appointment booked successfully.");
      setIsAppointmentDetails(false);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error booking appointment.");
    }
  };

  return (
    <>
      <Header />
      <div className="appointment-container">
        <div className="app-section">
          <h3 className="app-title">Specialization</h3>
          <div className="app-boxes">
            {doctors.map((item, index) => (
              <div
                key={index}
                className="specialization-box"
                onClick={() => setSpecialization(item.specialization)}
              >
                <h4>{item.specialization}</h4>
              </div>
            ))}
          </div>
        </div>

        {specialization && (
          <div className="app-section">
            <h3 className="app-title">Doctors</h3>
            <div className="app-boxes">
              {doctors
                .filter((doc) => doc.specialization === specialization)
                .map((doc, index) => (
                  <div
                    key={index}
                    className="doctor-box"
                    onClick={() => setSelectedDoctor(doc)}
                  >
                    <h4>{doc.user.name}</h4>
                  </div>
                ))}
            </div>
          </div>
        )}

        {selectedDoctor && (
          <div className="doctor-details-container">
            <div className="doctor-details">
              <div className="doctor-hospital">
                <h3>
                  Apollo Hospitals{" "}
                  <span
                    style={{
                      color: "green",
                      fontSize: "2rem",
                      fontWeight: 700,
                    }}
                  >
                    +
                  </span>
                  <p>Chandighar, Punjab 1600103</p>
                </h3>
              </div>

              <div className="doctor-info">
                <div>
                  <label>Name:</label>
                  <span>{selectedDoctor.user.name}</span>
                </div>
                <div>
                  <label>Email:</label>
                  <span>{selectedDoctor.user.email}</span>
                </div>
                <div>
                  <label>Phone:</label>
                  <span>{selectedDoctor.user.phone}</span>
                </div>
                <div>
                  <label>Specialization:</label>
                  <span>{selectedDoctor.specialization}</span>
                </div>

                <div className="submit-btn">
                  <button onClick={() => setIsAppointmentDetails(true)}>
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAppointmentDetails && (
          <div className="appointment-info">
            <div className="patient-doctor-info">
              <div>
                <h2>Patient</h2>
                {console.log(user?.UniqueId)}
                <p>{user?.name}</p>
                <p>{user?.email}</p>
                <p>{user?.phone}</p>
              </div>

              <div>
                <h2>Doctor</h2>
                {
                console.log(selectedDoctor?.DoctorID)}
                <p>{selectedDoctor?.user?.DoctorID}</p>
                <p>{selectedDoctor?.user?.name}</p>
                <p>{selectedDoctor?.user?.email}</p>
                <p>{selectedDoctor?.user?.phone}</p>
                <p>{selectedDoctor?.specialization}</p>
              </div>
            </div>

            <div className="appointment-input">
              <div className="input-field">
                <label htmlFor="appointmentDate">Appointment Date:</label>
                <input
                  type="date"
                  id="appointmentDate"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
              </div>

              <div className="input-field">
                <label htmlFor="appointmentTime">Appointment Time:</label>
                <input
                  type="time"
                  id="appointmentTime"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                />
              </div>
              <div className="submit-btn">
                <button onClick={handleAppointmentSubmission}>
                  Submit Detail
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Appointment;


