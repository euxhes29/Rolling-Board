
const TextareaField = ({
  label,
  name,
  register,
  errors,
  placeholder,
  className,
  defaultValue,
}) => {
  return (
    <>
      <label htmlFor={name}>
        {label}
        <textarea
          id={name}
          {...register(name)}
          defaultValue={defaultValue}
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
