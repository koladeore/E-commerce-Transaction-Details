import React from "react";
import "./CheckBox.css";

const CheckBox = ({ id, title, onChange }) => {
  return (
    <div className="checkbox__container">
      <input type="checkbox" id={id} onClick={onChange} />
      <label htmlFor={id}>{title}</label>
    </div>
  );
};

export default CheckBox;
