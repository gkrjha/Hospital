import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const loginInitialValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Auth = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        values
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log("Login Success:", response.data);

      const userRole = response.data.user.role;
      if (userRole === "Admin") {
        navigate("/admin");
      } else if (userRole === "Doctor") {
        navigate("/doctor");
      } else if (userRole === "Patient") {
        navigate("/patient");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      {errorMessage && <div className="form-error">{errorMessage}</div>}

      <Formik
        initialValues={loginInitialValues}
        validationSchema={validationSchema}
        onSubmit={handleLoginSubmit}
      >
        {({ handleSubmit }) => (
          <div className="form-cont">
            <form className="auth-form" onSubmit={handleSubmit}>
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
                <label>Password</label>
                <div className="auth-form-input">
                  <Field
                    type="password"
                    name="password"
                    className="form-input"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="form-error"
                  />
                </div>
              </div>

              <button type="submit" className="auth-form-button">
                Login
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Auth;
