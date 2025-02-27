import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Style.css";
import Header from "../navbar/Header";

const AppointList = () => {
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (e, appointmentId) => {
    setSelectedStatus({ ...selectedStatus, [appointmentId]: e.target.value });
  };

  const handleUpdateStatus = async (appointmentId) => {
    const status = selectedStatus[appointmentId];
    if (!status) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/appoint/status/${appointmentId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedAppointments = appointments.map((appointment) =>
        appointment.AppointmentId === appointmentId
          ? { ...appointment, status: response.data.appointment.status }
          : appointment
      );
      setAppointments(updatedAppointments);

      alert("Appointment status updated successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const doctorId = location?.state?.DoctorID;
      const getAppointments = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/appoint/${doctorId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAppointments(response.data.data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);

          console.error("Error updating appointment status:", error);
        }
      };
      getAppointments();
    }
  }, [location.state?.DoctorID, token]);

  if (loading) {
    return <div className="loading">Loading appointments...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  console.log(appointments);
  return (
    <>
      <Header />
      <div className="appointments-container">
        <h3 className="appointments-title">Appointments List</h3>
        {appointments.length > 0 ? (
          <ul className="appointments-list">
            {appointments.map((appointment) => (
              <li key={appointment.AppointmentId} className="appointment-item">
                <div className="appointment-details">
                  <p>
                    <strong>Patient:</strong> {appointment?.user?.name}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(appointment.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {appointment.time}
                  </p>
                  <p>
                    <strong>Status:</strong> {appointment.status}
                  </p>
                  <p>
                    <strong>Appointment Type:</strong>{" "}
                    {appointment.AppointmentType}
                  </p>

                  <select
                    value={
                      selectedStatus[appointment.AppointmentId] ||
                      appointment.status
                    }
                    onChange={(e) =>
                      handleStatusChange(e, appointment.AppointmentId)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirm">Confirm</option>
                    <option value="Cancle">Cancel</option>
                  </select>

                  <button
                    onClick={() =>
                      handleUpdateStatus(appointment.AppointmentId)
                    }
                  >
                    Update Status
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments available.</p>
        )}
      </div>
    </>
  );
};

export default AppointList;
