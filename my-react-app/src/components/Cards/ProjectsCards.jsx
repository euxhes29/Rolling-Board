import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectsCards.scss";
import EditProjectPopup from "../Popup/EditProjectPopup";
import ProjectService from "../../service/ProjectService";

const getRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const ProjectCard = ({ id, title, description, onEdit, color }) => {
  const navigate = useNavigate();

  return (
    <div
      className="project-card"
      style={{
        background: `linear-gradient(180deg, ${color} 0%, rgba(19, 5, 5, 0) 100%)`,
      }}
    >
      <div className="projects-card-description">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="projects-card-buttons">
        <button
          className="open-board"
          onClick={() => navigate(`/projects/${id}`)}
        >
          Open Board
        </button>
        <button className="edit" onClick={() => onEdit(id)}>
          Edit
        </button>
      </div>
    </div>
  );
};

const ProjectsCards = () => {
  const [projects, setProjects] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const observerRef = useRef();

  const fetchProjects = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await ProjectService.getProject({
        params: {
          page,
          pageSize: 10,
        },
      });

      if (response.status === 200 && response.data.status === "success") {
        const newProjects = response.data.data;

        setProjects((prevProjects) => [
          ...prevProjects,
          ...newProjects.map((project) => ({
            ...project,
            color: project.color || getRandomColor(),
            title: project.name,
            description: project.description,
          })),
        ]);
        setPage((prevPage) => prevPage + 1);
      } else {
        console.error("Përgjigje nga backend-i është gabim", response);
      }
    } catch (error) {
      console.error("Gabim gjatë marrjes së projekteve:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateBoard = async () => {
    const newProject = {
      title: "Title",
      description: "Description",
      color: getRandomColor(),
    };

    try {
      const response = await ProjectService.postProject({
        name: newProject.title,
        description: newProject.description,
      });

      if (response.status === 200 && response.data.status === "success") {
        const projectData = response.data.data;

        setProjects((prevProjects) => [
          ...prevProjects,
          {
            title: projectData.name,
            description: projectData.description,
            color: newProject.color,
          },
        ]);
      } else {
        console.error("Kthyer përgjigje e papritur:", response);
      }
    } catch (error) {
      console.error(
        "Gabim gjatë krijimit të projektit:",
        error.response || error
      );
    }
  };

  const handleEdit = (id) => {
    const project = projects.find((p) => p.id === id);
    setSelectedProject(project);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchProjects();
      }
    }, options);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading]);

  const handleProjectUpdate = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id
          ? {
              ...project,
              title: updatedProject.name,
              description: updatedProject.description,
            }
          : project
      )
    );
  };

  return (
    <>
      <div className="projects-cards">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            onEdit={handleEdit}
            color={project.color}
          />
        ))}

        <div
          className="project-card projects-card-8"
          onClick={handleCreateBoard}
        >
          <div className="projects-card-create">
            <img src="/assets/images/plus.png" alt="" />
            <p>Create Board</p>
          </div>
        </div>
      </div>

      {isEditPopupOpen && (
        <EditProjectPopup
          project={selectedProject}
          onClose={handleCloseEditPopup}
          onUpdate={handleProjectUpdate}
        />
      )}

      <div ref={observerRef} className="load-more-trigger"></div>
    </>
  );
};

export default ProjectsCards;
