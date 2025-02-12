import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import Header from "../navbar/Header";

const Appointment = () => {
  const [specialization, setSpecialization] = useState("");
  const [doctor, setDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorResponse = await axios.get(
          "http://localhost:8080/api/doctor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDoctor(doctorResponse.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      <Header />
      <div className="main-box">
        <div className="app-label">
          <h3>Specialization</h3>
        </div>
        <div className="app-sd">
          {doctor.map((item, index) => (
            <div
              key={index}
              className="boxes"
              onClick={() => setSpecialization(item.specialization)}
            >
              <h4>{item.specialization}</h4>
            </div>
          ))}
        </div>

        <div className="app-label">
          <h3>Doctors</h3>
        </div>
        <div className="app-sd">
          {doctor
            .filter((doc) => doc.specialization === specialization)
            .map((doc, index) => (
              <div
                key={index}
                className="boxes"
                onClick={() => setSelectedDoctor(doc)}
              >
                <h4>{doc.user.name}</h4>
              </div>
            ))}
        </div>
      </div>

      {selectedDoctor && (
        <div className="doctor-details-box-con">
          <div className="doctor-details-box">
            <div className="doctor-hospital">
              <div>
                <img
                  style={{
                    height: "100px",
                    borderRadius: "50%",
                    border: "3px solid orange",
                  }}
                  src={`data:image/jpeg;base64,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`}
                  alt=""
                />
              </div>
              <div className="hospital-detail">
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
                  <p style={{ fontSize: "1rem" }}>Chandighar, Punjab 1600103</p>
                </h3>
              </div>
            </div>

            <div className="doctor-drtails">
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <div>
                  <label htmlFor="">Name :</label>
                  <span style={{ marginLeft: "40px" }}>
                    {selectedDoctor.user.name}
                  </span>
                </div>

                <div>
                  <label htmlFor="">Email :</label>
                  <span style={{ marginLeft: "40px" }}>
                    {selectedDoctor.user.email}
                  </span>
                </div>

                <div>
                  <label htmlFor="">Phone :</label>
                  <span style={{ marginLeft: "40px" }}>
                    {selectedDoctor.user.phone}
                  </span>
                </div>

                <div>
                  <label htmlFor="">Speclization :</label>
                  <span style={{ marginLeft: "20px" }}>
                    {selectedDoctor.specialization}
                  </span>
                </div>
              </div>
              <div>
                <button style={{ cursor: "pointer" }}>Book Appointment</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="Appointment-info">
        <div className="details">
          <div>
            <h2>Patient</h2>
            <p>Gaurav kumar</p>
            <p>18gauravk@gmail.com</p>
            <p>7589696585</p>
            <p>22</p>
            <p>Male</p>
          </div>

          <div>
            <h2>Doctor</h2>
            <p>Gaurav kumar</p>
            <p>18gauravk@gmail.com</p>
            <p>7589696585</p>
            <p>22</p>
            <p>Male</p>
          </div>
        </div>

        
          <div className="input-Detail">
            <div className="date">
              <input type="date" />
            </div>
            <div className="date">
              <input type="time" />
            </div>
            <div>
              <button className="subind-detai">Submit Detail</button>
            </div>
          </div>
      </div>
    </>
  );
};

export default Appointment;
