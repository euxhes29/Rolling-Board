import React from "react";
import "./InputField.scss";

const InputField = ({
  label,
  type,
  name,
  errors,
  register,
  className,
  defaultValue,
}) => {
  return (
    <>
      <div className="input-field">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          className={className}
          id={name}
          {...register(name)}
          defaultValue={defaultValue}
        />
        {errors?.[name] && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {errors[name].message}
          </p>
        )}
      </div>
    </>
  );
};

export default InputField;
