import React from "react";

const Textarea = ({ label, className, value, onChange, placeholder }) => {
  return (
    <>
      <label>{label}</label>
      <textarea
        className={className}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></textarea>
    </>
  );
};

export default Textarea;
