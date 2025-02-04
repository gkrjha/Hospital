import React from "react";
import "./Services.css";
import { Link } from "react-router-dom";
const Services = () => {
  return (
    <div className="services">
      <div className="service-container">
        <div className="conatiner-1">
          <h1>Services</h1>
          <div className="conatiner-one">
            <Link to="" style={{ color: "orange", cursor: "pointer" }}>
              Home
            </Link>
         
          <span>/</span>
          <span>Services</span>
          </div>
        </div>
        <img
          src="https://hms.infyom.com/web_front/images/page-banner/Services.png"
          alt="Infy Care"
          className="img-fluid"
        ></img>
      </div>

      <div className="service-container-1">
        <h4>Our Services</h4>
        <div className="heading-1">
          <h1>
            We Offer Different Services To <br /> Improve Your Health
          </h1>
        </div>
        <div className="card-bar">
          <div className="card">
            <img
              src="https://infyhms.sgp1.cdn.digitaloceanspaces.com/696/Cardiology.png"
              class="card-img-top img-wh mx-auto "
              alt="Cardiology"
            />
            <h2>Cardiology</h2>
            <h3>
              Cardiology is medicine speciality that involves diagnosis and
              treatment of disorders of the heart and certain parts of the...
            </h3>
          </div>
          <div className="card">
            <img
              src="https://infyhms.sgp1.cdn.digitaloceanspaces.com/279/Medicine.png"
              class="card-img-top img-wh mx-auto "
              alt="Cardiology"
            />
            <h2>Medicine</h2>
            <h3>
              Medicine is the science[1] and practice[2] of caring for a
              patient, managing the diagnosis, prognosis, prevention,
              treatmen...
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
