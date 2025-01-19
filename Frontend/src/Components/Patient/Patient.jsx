import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import './style.css'; // Separate CSS file for styles

const initialvalue = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    age: '',
};

const loginInitialValues = {
    email: '',
    password: '',
};

const validationSchema = yup.object({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    phone: yup
        .string()
        .length(10, 'Phone number must be exactly 10 digits')
        .matches(/^\d{10}$/, 'Phone number must be a valid 10-digit number')
        .required('Phone number is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),
    gender: yup.string().required('Gender is required'),
    age: yup
        .number()
        .required('Age is required')
        .min(18, 'Age must be at least 18'),
});

const Patient = () => {
    const [status, setStatus] = useState("Signup");

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/api/user', values);
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLoginSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', values);
            console.log('Login Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="form-container">
                <h2 className="form-title">{status === "Signup" ? "Patient Registration" : "Login"}</h2>
                {status === "Signup" ? (
                    <Formik
                        initialValues={initialvalue}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit }) => (
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <Field type="text" name="firstname" className="form-input" />
                                    <ErrorMessage name="firstname" component="div" className="form-error" />
                                    <label>Last Name</label>
                                    <Field type="text" name="lastname" className="form-input" />
                                    <ErrorMessage name="lastname" component="div" className="form-error" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <Field type="email" name="email" className="form-input" />
                                    <ErrorMessage name="email" component="div" className="form-error" />
                                    <label>Phone</label>
                                    <Field type="text" name="phone" className="form-input" />
                                    <ErrorMessage name="phone" component="div" className="form-error" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <Field type="password" name="password" className="form-input" />
                                    <ErrorMessage name="password" component="div" className="form-error" />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <Field as="select" name="gender" className="form-input">
                                        <option value="">Select Gender</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="O">Others</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="form-error" />
                                </div>
                                <div className="form-group">
                                    <label>Age</label>
                                    <Field type="number" name="age" className="form-input" />
                                    <ErrorMessage name="age" component="div" className="form-error" />
                                </div>
                                <button type="submit" className="form-button">
                                    Submit
                                </button>
                            </form>
                        )}
                    </Formik>
                ) : (
                    <Formik
                        initialValues={loginInitialValues}
                        onSubmit={handleLoginSubmit}
                    >
                        {({ handleSubmit }) => (
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <Field type="email" name="email" className="form-input" />
                                    <ErrorMessage name="email" component="div" className="form-error" />
                                    <label>Password</label>
                                    <Field type="password" name="password" className="form-input" />
                                    <ErrorMessage name="password" component="div" className="form-error" />
                                </div>
                                <button type="submit" className="form-button">
                                    Login
                                </button>
                            </form>
                        )}
                    </Formik>
                )}
                <h2 className="">
                    {status === "Signup" ? "Already have an account?" : "Don't have an account?"}{' '}
                    <button onClick={() => setStatus(status === "Signup" ? "Login" : "Signup")}>
                        {status === "Signup" ? "Login" : "Signup"}
                    </button>
                </h2>
            </div>
        </>
    );
};

export default Patient;
