import axios from "axios";
import { Field, ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  role: "",
  specialization: "",
  gender: "",
  age: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  role: yup.string().required("Role is required"),

  specialization: yup
    .string()
    .nullable()
    .when("role", (role, schema) =>
      role === "Doctor"
        ? schema.required("Specialty is required")
        : schema.notRequired()
    ),

  gender: yup
    .string()
    .nullable()
    .when("role", (role, schema) =>
      role === "Patient"
        ? schema.required("Gender is required")
        : schema.notRequired()
    ),

  age: yup
    .number()
    .nullable()
    .when("role", (role, schema) =>
      role === "Patient"
        ? schema.required("Age is required").positive().integer()
        : schema.notRequired()
    ),
});

export const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      console.log(values);
      await axios.post("http://localhost:8080/api/user", values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(values);
      navigate("/admin");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Registration Form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <div className="form-cont">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Name</label>
              <div className="auth-form-input">
                <Field type="text" name="name" className="form-input" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="form-error"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="auth-form-input">
                <Field type="email" name="email" className="form-input" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="form-error"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone</label>
              <div className="auth-form-input">
                <Field type="text" name="phone" className="form-input" />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="form-error"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Role</label>
              <div className="auth-form-input">
                <Field
                  as="select"
                  name="role"
                  className="form-input"
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="form-error"
                />
              </div>
            </div>

            {values.role === "Doctor" && (
              <div className="form-group">
                <label>Specialty</label>
                <div className="auth-form-input">
                  <Field
                    as="select"
                    name="specialization"
                    className="form-input"
                    onChange={handleChange}
                  >
                    <option value="">Select Specialty</option>
                    <option value="Anxiety & depression">
                      Anxiety & Depression
                    </option>
                    <option value="Bariatric Surgery">Bariatric Surgery</option>
                    <option value="Breast Surgery & Breast Care">
                      Breast Surgery & Breast Care
                    </option>
                    <option value="Cardiac Surgery">Cardiac Surgery</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pulmonology">Pulmonology</option>
                    <option value="Rheumatology">Rheumatology</option>
                  </Field>
                  <ErrorMessage
                    name="specialty"
                    component="div"
                    className="form-error"
                  />
                </div>
              </div>
            )}

            {values.role === "Patient" && (
              <>
                <div className="form-group">
                  <label>Gender</label>
                  <div className="auth-form-input">
                    <Field
                      as="select"
                      name="gender"
                      className="form-input"
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="form-error"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <div className="auth-form-input">
                    <Field
                      type="number"
                      name="age"
                      className="form-input"
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="form-error"
                    />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="auth-form-button">
              Register
            </button>
          </form>
          </div>
        )}
      </Formik>

      {errorMessage && <p className="form-error-message">{errorMessage}</p>}
    </div>
  );
};
