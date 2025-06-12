import React, { useState } from "react";
import "./EditProjectPopup.scss";
import ProjectService from "../../service/ProjectService";
import Popup from "./Popup";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../InputField/InputField";
import TextareaField from "../TextAreaField/TextAreaField";

const UpdateProjectSchema = z.object({
  name: z.string().min(3, "Project name must have at least 3 characters"),
  description: z
    .string()
    .min(10, "Project description must have at least 10 characters."),
});

const EditProjectPopup = ({ project, onClose, onUpdate }) => {
  if (!project) return null;

  const methods = useForm({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      name: project.title,
      description: project.description,
    },
  });

  const { handleSubmit } = methods;

  const handleSave = async (data) => {
    const projectID = project.id;

    const updatedProject = {
      name: data.name,
      description: data.description,
    };

    try {
      const response = await ProjectService.updateProject(
        projectID,
        updatedProject
      );

      console.log("Përgjigja nga backend:", response.data);

      if (response.status === 200 && response.data.status === "success") {
        console.log("Projekti u përditësua:", response.data.data);
        const updatedData = response.data.data;
        onUpdate(updatedData);
        onClose();
      } else {
        console.error("Kthyer përgjigje e papritur:", response);
      }
    } catch (error) {
      console.error("Gabim gjatë përditësimit të projektit:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Popup
        title="Edit Project"
        onSubmit={handleSubmit(handleSave)}
        onClose={onClose}
        btnName1="Save"
        btnName2="Cancel"
      >
        <InputField label="Title" type="text" name="name" />
        <TextareaField label="Description" name="description" />
      </Popup>
    </FormProvider>
  );
};

export default EditProjectPopup;
