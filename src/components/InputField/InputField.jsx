import "./InputField.scss";
import { useFormContext } from '../InputField/FormContext'; 


const InputField = ({ label, type, name, className }) => {
  
  const { register, errors, defaultValues } = useFormContext();

  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className={className}
        id={name}
        {...register(name)}
        defaultValue={defaultValues?.[name]} 
      />
      {errors?.[name] && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default InputField;
