import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../navbar/Header";
import { loadStripe } from "@stripe/stripe-js";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Appointment.css";
import AppointmentCard from "./AppointmentCard";

const Appointment = () => {
  const [specialization, setSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [user, setUser] = useState(null);
  const [isAppointmentDetails, setIsAppointmentDetails] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [appointmentId, setAppointmentId] = useState(null);
  const [doctorAppointmentsCount, setDoctorAppointmentsCount] = useState(0);

  const token = localStorage.getItem("token");
  const users = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (users) {
      setUser(users);
    }
  }, []);

  const navigation = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/doctor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [token]);

  const handleAppointmentSubmission = async () => {
    if (
      !appointmentDate ||
      !appointmentTime ||
      !selectedDoctor ||
      !appointmentType
    ) {
      alert("Please fill all the details.");
      return;
    }

    const value = {
      user_ID: user?.UniqueId,
      DoctorId: selectedDoctor?.DoctorID,
      date: appointmentDate,
      time: appointmentTime,
      AppointmentType: appointmentType,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/appoint",
        value,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(
        "Appointment created:",
        response?.data?.appointment?.AppointmentId
      );
      console.log(response);
      console.log(response?.data?.clientSecret);
      setAppointmentId(response?.data?.appointment?.AppointmentId);
      setClientSecret(response?.data?.clientSecret);
      setIsAppointmentDetails(false);
      navigation("/payment", {
        state: {
          appointmentId: response?.data?.appointment?.AppointmentId,
          clientSecret: response?.data?.clientSecret,
        },
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Error booking appointment.");
    }
  };
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setAppointmentDate(selectedDate);

    if (doctorAppointmentsCount >= 3) {
      alert("Doctor already has the maximum appointments for this date.");
      return;
    }
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      <Header />
      <div className="appointment-container">
        <div className="app-section">
          <h3 className="app-title">Specialization</h3>
          <div className="app-boxes">
            {Array.from(
              new Set(doctors.map((item) => item.specialization))
            ).map((specialization, index) => (
              <div
                key={index}
                className="specialization-box"
                onClick={() => setSpecialization(specialization)}
              >
                <h4>{specialization}</h4>
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
                  <p>Chandigarh, Punjab 1600103</p>
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
                <p>{user?.name}</p>
                <p>{user?.email}</p>
                <p>{user?.phone}</p>
              </div>

              <div>
                <h2>Doctor</h2>
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
                  onChange={handleDateChange}
                  min={today}
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

              <div className="input-field">
                <label htmlFor="appointmentType">Appointment Type:</label>
                <select
                  id="appointmentType"
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                >
                  <option>Select Appointment Type</option>
                  <option value="New Consultation">New Consultation</option>
                  <option value="Follow-Up">Follow-Up</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div className="submit-btn">
                <button onClick={handleAppointmentSubmission}>
                  Submit Appointment Details
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
