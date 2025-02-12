import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // Import Protected Route
import Doctor from "./Components/Doctors/Doctor";
import Header from "./Components/navbar/Header";
import Footer from "./Components/navbar/Footer";
import Services from "./Components/Services/Services";
import Patient from "./Components/Patient/Patient";
import Admin from "./Components/Admin/Admin";
import Auth from "./Components/Auth/Auth";
import { RegistrationForm } from "./Components/Auth/Signup";
import Doctorlist from "./Components/Doctors/Doctorlist";
import Patientlist from "./Components/Patient/Patientlist";
import Appointment from "./Components/Appointment/Appointment";
import AppointList from "./Components/Appointment/AppointList";

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        {" "}
        <Header /> <Services /> <Footer />{" "}
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        {" "}
        <Header /> <Auth /> <Footer />{" "}
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        {" "}
        <RegistrationForm /> <Footer />{" "}
      </>
    ),
  },

  {
    path: "/patient",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <Patient /> }],
  },
  {
    path: "/doctor",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <Doctor /> }],
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
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
