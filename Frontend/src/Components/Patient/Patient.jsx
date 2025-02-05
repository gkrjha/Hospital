import React, { useEffect, useState } from "react";

import DoctorCard from "../Content/DoctorCard";

const Doctor = () => {
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.name);
    if (user) {
      setDoctorData(user);
    }
  }, []);

  return (
    <div>
      {console.log(doctorData)}
      {doctorData ? (
        <DoctorCard
          doctor={doctorData}
          button={
            doctorData.role === "Doctor"
              ? "Get Appointment"
              : "Create Appointment"
          }
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Doctor;
