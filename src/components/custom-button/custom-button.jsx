import React from "react";
import "./custom-button.scss";

const CustomButton = ({ children, isGoogle, ...otherProps }) => (
  <button
    className={`${isGoogle ? "google-btn" : ""} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
