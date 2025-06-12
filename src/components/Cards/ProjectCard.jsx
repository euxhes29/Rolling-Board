import Button from "../Button/Buttons";
import "./ProjectCard.scss";

const ProjectCard = ({ title, description, onEdit, color, onClick }) => {
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
        <Button variant="solid" onClick={onClick}>
          Open Board
        </Button>
        <Button variant="solid" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
