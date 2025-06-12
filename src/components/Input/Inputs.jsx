import React from "react";

const Inputs = ({ label, type, value, onChange, className, placeholder }) => {
  return (
    <>
      <label htmlFor="">
        {label}
        <input
          type={type}
          className={className}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        ></input>
      </label>
    </>
  );
};

export default Inputs;
