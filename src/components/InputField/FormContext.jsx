import  { createContext, useContext } from 'react';


const FormContext = createContext();

export const useFormContext = () => {
  return useContext(FormContext);
};

export const FormProvider = ({ children, value }) => {
  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};
