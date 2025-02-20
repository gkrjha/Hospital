import React, { useEffect, useState } from "react";
import "./Doctor.css";
import DoctorCard from "../Content/DoctorCard";
import { useLocation } from "react-router-dom";

const Doctor = ({ ...props }) => {
  const [doctorData, setDoctorData] = useState(null);
  const location = useLocation();
  const doctorid = location?.state?.DoctorID;
  const [DoctorID,setDoctorID]=useState(doctorid)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (user) {
      setDoctorData(user);
    }
  }, []);

  return (
    <div>
      {doctorData ? (
        <DoctorCard
        doctorid = {DoctorID}
          doctor={doctorData}
          button={
            doctorData.role === "Doctor"
              ? "Get Appointment"
              : "Book an Appointment"
          }
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Doctor;
