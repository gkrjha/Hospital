import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Style.css";
const AppointList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const doctorId = user.id;
      const getAppointments = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/appoint?doctorId=${doctorId}`
          );
          console.log(response.data);
          setAppointments(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      getAppointments();
    }
  }, []);

  return (
    <div>
      <h3>Appointments List</h3>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment, index) => (
            <div key={index} className="appointment">
              <li key={appointment.AppointmentId} className="appointment-item">
                <p>
                  <strong>Patient:</strong>{" "}
                  {appointment.patient_detail.user.name}
                </p>
                <p>
                  <strong>Doctor:</strong> {appointment.doctor_detail.user.name}
                </p>
                <p>
                  <strong>Specialization:</strong>{" "}
                  {appointment.doctor_detail.specialization}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appointment.date).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {appointment.status}
                </p>
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <p>No appointments</p>
      )}
    </div>
  );
};

export default AppointList;
