import React from "react";
import { useFormContext } from "react-hook-form";
import "./InputField.scss";

const InputField = ({ label, type, name, className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="input-field">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          className={className}
          id={name}
          {...register(name)}
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
