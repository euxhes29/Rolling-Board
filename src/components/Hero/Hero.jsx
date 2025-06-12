import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.scss";
import Button from "../Button/Buttons";

const Hero = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("accessToken");

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/projects");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="hero">
      <div className="gradient-left">
        <img src="/assets/images/gradient-left.png" alt="" />
      </div>
      <div className="gradient-right">
        <img src="/assets/images/gradient-right.png" alt="" />
      </div>

      <div className="hero-content">
        <div className="hero-heading">
          <p>Project Managment</p>
          <h1>Colaborate and build faster, together.</h1>
        </div>

        <div className="hero-text">
          <p>Create, share, and get feedback with collaborative</p>
          <p>boards for rapid development.</p>
          <Button variant="hover" size="medium" onClick={handleClick}>
            Create Kanban Board
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
