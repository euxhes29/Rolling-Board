import React from "react";
import Popup from "../Popup";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../../InputField/InputField";

const CreateColumnSchema = z.object({
  columnName: z.string().min(3, "Column name must have at least 3 characters"),
});

const CreateColumn = ({ closeColumnPopup, addNewColumn }) => {
  const methods = useForm({
    resolver: zodResolver(CreateColumnSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    addNewColumn(data.columnName);
  };

  return (
    <>
      <FormProvider {...methods}>
        <Popup
          title="Add Column"
          onClose={closeColumnPopup}
          onSubmit={handleSubmit(onSubmit)}
          btnName1="Create a column"
          btnName2="Cancel"
        >
          <InputField label="Name" type="text" name="columnName" />
        </Popup>
      </FormProvider>
    </>
  );
};

export default CreateColumn;
