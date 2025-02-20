import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // Import Protected Route
import Header from "./Components/navbar/Header";
import Footer from "./Components/navbar/Footer";
import Services from "./Components/Services/Services";
import Doctor from "./Components/Doctors/Doctor";
import Patient from "./Components/Patient/Patient";
import Admin from "./Components/Admin/Admin";
import Auth from "./Components/Auth/Auth";
import { RegistrationForm } from "./Components/Auth/Signup";
import Doctorlist from "./Components/Doctors/Doctorlist";
import Patientlist from "./Components/Patient/Patientlist";
import Appointment from "./Components/Appointment/Appointment";
import AppointList from "./Components/Appointment/AppointList";

import { Elements } from "@stripe/react-stripe-js";
import AppointmentCard from "./Components/Appointment/AppointmentCard";

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Services />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Auth />
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <RegistrationForm /> }],
  },
  {
    path: "/patient",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <Patient /> }],
  },
  {
    path: "/doctor",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: (
          <Layout>
            <Doctor />
          </Layout>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <Admin /> }],
  },
  {
    path: "/doctor_detail",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <Doctorlist /> }],
  },
  {
    path: "/patient_detail",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <Patientlist /> }],
  },
  {
    path: "/appointment",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <Appointment /> }],
    
  },
  {
    path: "/appointlist",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <AppointList /> }],
  },
  {
    path: "/payment",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <AppointmentCard /> }],
  }
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
