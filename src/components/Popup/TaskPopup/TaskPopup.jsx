import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./TaskPopup.scss";
import TaskService from "../../../service/TaskService";
import Popup from "../Popup";
import InputField from "../../InputField/InputField";
import TextareaField from "../../TextAreaField/TextAreaField";
import SelectField from "../../SelectField/SelectField";

const TaskPopup = ({ closePopup, currentTaskId, handleSaveTask }) => {
  return (
    <Popup title="Update Task" onClose={closePopup}>
      <TaskUpdateForm
        currentTaskId={currentTaskId}
        closePopup={closePopup}
        handleSaveTask={handleSaveTask}
      />
    </Popup>
  );
};

const TaskUpdateForm = ({ currentTaskId, closePopup, handleSaveTask }) => {
  const [users, setUsers] = useState([]);

  const UpdateTaskSchema = z.object({
    newTaskName: z.string().min(3, "The task name must have 3 characters"),
    currentDescription: z
      .string()
      .min(10, "The description must be at least 10 characters long"),
    assignedTo: z.string().min(1, "Choose a user"),
  });

  const methods = useForm({
    resolver: zodResolver(UpdateTaskSchema),

    defaultValues: async () => {
      try {
        const response = await TaskService.getTaskId(currentTaskId);
        const task = response.data.data;

        const usersResponse = await TaskService.getUsers();
        setUsers(usersResponse.data.data);

        return {
          newTaskName: task.name || "",
          currentDescription: task.description || "",
          assignedTo: task.assigned?.id?.toString() || "",
        };
      } catch (error) {
        console.error("Gabim gjatë ngarkimit të task dhe përdoruesve:", error);
      }
    },
  });

  const { handleSubmit } = methods;

  const handleUpdateTask = (data) => {
    const updatedTask = {
      name: data.newTaskName,
      description: data.currentDescription,
      assignedId: Number(data.assignedTo),
    };

    TaskService.updateTask(currentTaskId, updatedTask)
      .then((response) => {
        console.log("Tasku u përditësua me sukses:", response.data);

        console.log("Të dhënat e dërguara:", data);

        handleSaveTask(response.data.data);
        closePopup();
      })
      .catch((error) => {
        console.error("Gabim gjatë përditësimit të task-ut:", error);
      });
  };

  return (
    <FormProvider {...methods}>
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
      <div className="popup-buttons">
        <button onClick={handleSubmit(handleUpdateTask)}>Save</button>
        <button onClick={closePopup}>Cancel</button>
      </div>
    </FormProvider>
  );
};

export default TaskPopup;
