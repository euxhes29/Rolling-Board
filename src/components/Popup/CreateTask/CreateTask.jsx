import React, { useState, useEffect } from "react";
import "./CreateTask.scss";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Popup from "../Popup";
import InputField from "../../InputField/InputField";
import TextareaField from "../../TextAreaField/TextAreaField";
import SelectField from "../../SelectField/SelectField";
import TaskService from "../../../service/TaskService";

const CreateTaskSchema = z.object({
  taskName: z.string().min(3, "Task name must have at least 3 characters"),
  description: z
    .string()
    .min(3, "Task description must have at least 3 characters"),
  assignedTo: z.string().min(1, "Choose a user"),
});

const CreateTask = ({ closeAddTask, addNewTask, columnId }) => {
  const [users, setUsers] = useState([]);

  const methods = useForm({
    resolver: zodResolver(CreateTaskSchema),
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    console.log("Kolona e zgjedhur në CreateTask:", columnId);
  }, [columnId]);

  const onSubmit = (data) => {
    addNewTask(columnId, data.taskName, data.description, data.assignedTo);
  };

  useEffect(() => {
    TaskService.getUsers()
      .then((response) => {
        console.log("Përgjigja për përdoruesit:", response.data);
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Gabim gjatë ngarkimit të përdoruesve:", error);
      });
  }, []);

  return (
    <FormProvider {...methods}>
      <Popup
        title="Add Task"
        onClose={closeAddTask}
        onSubmit={handleSubmit(onSubmit)}
        btnName1="Create a task"
        btnName2="Cancel"
      >
        <InputField label="Name" type="text" name="taskName" />
        <TextareaField
          label="Description"
          placeholder="Write a description..."
          name="description"
        />
        <SelectField
          label="Assigned to"
          name="assignedTo"
          placeholder="Select User"
          options={users.map((user) => ({
            key: user.id,
            value: user.id,
            label: `${user.firstName} ${user.lastName}`,
          }))}
        />
      </Popup>
    </FormProvider>
  );
};

export default CreateTask;
