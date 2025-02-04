import React, { useEffect, useState } from "react";
import * as yup from "yup";
import "./Appointment.css";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  PatientId: yup.string().required("Patient name required"),
  DoctorId: yup.string().required("Must select a Doctor"),
  date: yup.string().required("Date should be mentioned"),
  specialization: yup.string().required("Specialization is required"),
});

const Appointment = () => {
  const [doctor, setDoctor] = useState([]);
  const [patient, setPatient] = useState([]);
  const navigate =useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorResponse = await axios.get(
          "http://localhost:8080/api/doctor"
        );
        const patientResponse = await axios.get(
          "http://localhost:8080/api/patient"
        );
        setDoctor(doctorResponse.data);
        setPatient(patientResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/appoint",
        values
      );
      console.log("Response:", response.data);
      confirm("Appointment has been created successfully")
      navigate("/patient")
      
    } catch (error) {
      console.error("Error in appointment creation:", error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          PatientId: "",
          DoctorId: "",
          date: "",
          specialization: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <div  className="cont">
          <Form className="appoint-form">
            <div className="form-groups">
              <label>Patient Name</label>
              <div className="auth-form-input">
                <Field
                  as="select"
                  name="PatientId"
                  className="form-input"
                  value={values.PatientId}
                  onChange={handleChange}
                >
                  <option value="">Select Patient</option>
                  {patient.map((data, index) => (
                    <option value={data.PatientID} key={index}>
                      {data.user.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="PatientId"
                  component="div"
                  className="form-error"
                />
              </div>
            </div>

            {/* Specialization Select */}
            <div className="form-groups">
              <label>Specialization</label>
              <div className="auth-form-input">
                <Field
                  as="select"
                  name="specialization"
                  className="form-input"
                  value={values.specialization}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue("DoctorId", "");
                  }}
                >
                  <option value="">Select Specialization</option>
                  {doctor.map((data, index) => (
                    <option value={data.specialization} key={index}>
                      {data.specialization}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="specialization"
                  component="div"
                  className="form-error"
                />
              </div>
            </div>

            
            <div className="form-groups">
              <label>Doctor</label>
              <div className="auth-form-input">
                <Field
                  as="select"
                  name="DoctorId"
                  className="form-input"
                  value={values.DoctorId}
                  onChange={handleChange}
                >
                  <option value="">Select Doctor</option>
                  {doctor
                    .filter(
                      (item) => item.specialization === values.specialization
                    )
                    .map((item, index) => (
                      <option value={item.DoctorID} key={index}>
                        {item.user.name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="DoctorId"
                  component="div"
                  className="form-error"
                />
              </div>
            </div>

        
            <div className="form-groups">
              <label>Date</label>
              <div className="auth-form-input">
                <Field
                  type="date"
                  name="date"
                  className="form-input"
                  value={values.date}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="form-error"
                />
              </div>
            </div>

            <button type="submit" className="appoint-button">
              Create Appointment
            </button>
          </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Appointment;

