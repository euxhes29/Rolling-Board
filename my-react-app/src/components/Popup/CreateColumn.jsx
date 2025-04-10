import React, { useState } from "react";
import Popup from "../Popup/Popup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../InputField/InputField";

const CreateColumnSchema = z.object({
  columnName: z.string().min(3, "Column name must have at least 3 characters"),
});

const CreateColumn = ({ closeColumnPopup, addNewColumn }) => {
  const [columnName, setColumnName] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateColumnSchema),
  });

  const onSubmit = (data) => {
    addNewColumn(data.columnName);
  };

  return (
    <>
      <Popup
        title="Add Column"
        onClose={closeColumnPopup}
        onSubmit={handleSubmit(onSubmit)}
        btnName1="Create a column"
        btnName2="Cancel"
      >
        <InputField
          label="Name"
          type="text"
          name="columnName"
          defaultValue={columnName}
          register={register}
          errors={errors}
        />
      </Popup>
    </>
  );
};

export default CreateColumn;
