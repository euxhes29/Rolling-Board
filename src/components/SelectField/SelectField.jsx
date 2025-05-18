import React from "react";
import { useFormContext } from "react-hook-form";

const SelectField = ({ label, name, options, placeholder, className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <label htmlFor={name}>
        {label}
        <select id={name} {...register(name)} className={className}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors[name] && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {errors[name].message}
          </p>
        )}
      </label>
    </>
  );
};

export default SelectField;
