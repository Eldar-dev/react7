import React from "react";
import "./error-indicator.css";

const ErrorIndicator = () => {
  return (
    <div className="error-message">
      <h1>BOOM!</h1>
      <p>something has gone terribly wrong </p>
    </div>
  );
};

export default ErrorIndicator;
