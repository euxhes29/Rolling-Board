import React from "react";
import "../pages/Projects.scss";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProjectsCards from "../components/Cards/ProjectsCards";

const Projects = () => {
  return (
    <>
      <Navbar />
      <div className="projects">
        <div className="projects-heading">
          <h2>Projects</h2>
          <div className="search-bar">
            <input
              type="text"
              name="Search"
              id="Search"
              placeholder="Search Board..."
            />
            <i className="fi fi-rr-search"></i>
          </div>
        </div>
        <ProjectsCards />
      </div>
      <Footer />
    </>
  );
};

export default Projects;
