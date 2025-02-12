import React from "react";
import "./Admin.css";

const Card = ({ Count, role, click }) => {
  return (
    <div className="Card-detail">
      <h4>
        Total {role}: <span>{Count}</span>
      </h4>
      <div className="card-button">
        <button onClick={click}>View</button>
      </div>
    </div>
  );
};

export default Card;
