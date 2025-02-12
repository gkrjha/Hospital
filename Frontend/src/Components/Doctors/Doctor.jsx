import React, { useEffect, useState } from "react";
import "./Doctor.css";
import DoctorCard from "../Content/DoctorCard";

const Doctor = () => {
  const [doctorData, setDoctorData] = useState(null);

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
