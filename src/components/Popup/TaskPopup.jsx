import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import "./TaskPopup.scss";
import TaskService from "../../service/TaskService";
import Popup from "../Popup/Popup";
import InputField from "../InputField/InputField";
import TextareaField from "../TextAreaField/TextAreaField";
import SelectField from "../SelectField/SelectField";

const UpdateTaskSchema = z.object({
  newTaskName: z.string().min(3, "The task name must have 3 characters"),
  currentDescription: z
    .string()
    .min(10, "The description must be at least 10 characters long"),
  assignedTo: z.string().min(1, "Choose a user"),
});

const TaskPopup = ({
  isPopupOpen,
  closePopup,
  currentTaskId,
  currentComment,
  handleSaveTask,
}) => {
  const [users, setUsers] = useState([]);

  const methods = useForm({
    resolver: zodResolver(UpdateTaskSchema),
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (isPopupOpen && currentTaskId) {
      console.log("Popup u hap me ID:", currentTaskId);
      TaskService.getTaskId(currentTaskId)
        .then((response) => {
          const task = response.data.data;
          console.log("Task Details nga backend:", task);

          reset({
            newTaskName: task.name || "",
            currentDescription: task.description || "",
            assignedTo: task.assigned?.id?.toString() || "",
          });
        })
        .catch((error) => {
          console.error("Gabim gjatë ngarkimit të task-ut:", error);
        });

      TaskService.getUsers()
        .then((response) => {
          console.log("Përgjigja për përdoruesit:", response.data);
          setUsers(response.data.data);
        })
        .catch((error) => {
          console.error("Gabim gjatë ngarkimit të përdoruesve:", error);
        });
    }
  }, [isPopupOpen, currentTaskId, reset]);

  if (!isPopupOpen) return null;

  const handleUpdateTask = (data) => {
    const updatedTask = {
      name: data.newTaskName,
      description: data.currentDescription,
      assignedId: Number(data.assignedTo),
      comment: currentComment,
    };

    axios;
    TaskService.updateTask(currentTaskId, updatedTask)
      .then((response) => {
        console.log("Tasku u përditësua me sukses:", response.data);

        console.log("Të dhënat e dërguara:", data);

        handleSaveTask(response.data.data);
        closePopup();
      })
      .catch((error) => {
        console.error("Gabim gjatë përditësimit të task-it:", error);
      });
  };

  return (
    <FormProvider {...methods}>
      <Popup
        title="Task Update"
        onSubmit={handleSubmit(handleUpdateTask)}
        onClose={closePopup}
        btnName1="Save"
        btnName2="Cancel"
      >
        <InputField
          label="Name"
          type="text"
          className="task-popup-name"
          name="newTaskName"
        />
        <TextareaField label="Description" name="currentDescription" />
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

export default TaskPopup;
