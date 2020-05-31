import React from "react";
import "./custom-button.scss";

const CustomButton = ({ children, isGoogle, inverted, ...otherProps }) => (
  <button
    className={`${inverted ? "inverted" : ""} ${
      isGoogle ? "google-btn" : ""
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
