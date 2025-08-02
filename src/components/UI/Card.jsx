import React from "react";
import Button from "./Button";

const Card = ({ title, description, cta, onClick, children }) => {
  return (
    <div className="card" style={{
        width: "250px",
        fontSize: "0.95rem",
        padding: "12px",
        boxSizing: "border-box",
        margin: "0.5em",
      }}>
      {children}
      <div className="card-content">
        <h3 className="card-title fs-5 mt-3">{title}</h3>
        <p className="card-description">{description}</p>
        <Button text={cta} variant="success" onClick={onClick}>  </Button>
      </div>
    </div>
  );
}
export default Card;
