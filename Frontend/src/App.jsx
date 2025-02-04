import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import Doctor from "./Components/Doctors/Doctor";
import Header from "./Components/navbar/Header";
import Footer from "./Components/navbar/Footer";
import Services from "./Components/Services/Services";
import Patient from "./Components/Patient/Patient";
import Admin from "./Components/Admin/Admin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./Components/Auth/Auth";
import { RegistrationForm } from "./Components/Auth/Signup";
import Doctorlist from "./Components/Doctors/Doctorlist";
import Patientlist from "./Components/Patient/Patientlist";
import Appointment from "./Components/Appointment/Appointment";
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Services />
          <Footer />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Header />
          <Auth />
          <Footer />
        </>
      ),
    },
    {
      path: "/patient",
      element: (
        <>
          <Header />
          <Patient />
          <Footer />
        </>
      ),
    },
    {
      path: "/doctor",
      element: (
        <>
          <Header />
          <Doctor />
          <Footer />
        </>
      ),
    },
    {
      path: "/admin",
      element: (
        <>
          <Header />
          <Admin />
          <Footer />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Header />
          <RegistrationForm />
          <Footer />
        </>
      ),
    },
    {
      path: "/doctor_detail",
      element: (
        <>
          <Header />
         <Doctorlist />
          <Footer />
        </>
      )
    },
    {
      path:"/patient_detail",
      element: (
        <>
          <Header />
         <Patientlist />
          <Footer />
        </>
      )
    },
    {
      path:"/appointment",
      element: (
        <>
          <Header />
         <Appointment />
          <Footer />
        </>
      ) 
    }
  ]);
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
