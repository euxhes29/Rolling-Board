import React from "react";
import { useFormContext } from "react-hook-form";

const TextareaField = ({ label, name, placeholder, className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor={name}>
        {label}
        <textarea
          id={name}
          {...register(name)}
          placeholder={placeholder}
          className={className}
        />
        {errors[name] && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {errors[name].message}
          </p>
        )}
      </label>
    </>
  );
};

export default TextareaField;
