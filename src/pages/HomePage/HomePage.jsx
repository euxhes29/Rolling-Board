import React from "react";
import "./HomePage.scss";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Footer from "../../components/Footer/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="cards-container">
        <div className="cards">
          <div className="card-image">
            <img src="/assets/images/Group-1.png" alt="" />
          </div>
          <div className="card-text">
            <h3>Integrate</h3>
            <p>
              The ability to quickly set up and customize workflows for just
              about anything.
            </p>
          </div>
        </div>
        <div className="cards">
          <div className="card-image">
            <img src="/assets/images/Group-2.png" alt="" />
          </div>
          <div className="card-text">
            <h3>Colaborate</h3>
            <p>
              Manage projects, organize tasks, and build team spirit—all in one
              place.
            </p>
          </div>
        </div>
        <div className="cards">
          <div className="card-image">
            <img src="/assets/images/Group-3.png" alt="" />
          </div>
          <div className="card-text">
            <h3>Succeed</h3>
            <p>
              Every single part of your task can be managed, tracked, and shared
              with teammates.
            </p>
          </div>
        </div>
      </div>

      <div className="section-one">
        <div className="section-one-text">
          <div className="logo">
            <img src="/assets/images/check-logo.png" alt="" />
            <p>Universal</p>
          </div>
          <div className="description">
            <h3>Build the workflow you want</h3>
            <p>
              Manage your boards using Drag-n-Drop, create adittional boards and
              tasks.
            </p>
          </div>
        </div>
        <div className="section-one-image">
          <img src="/assets/images/projects-image.png" alt="" />
        </div>
      </div>

      <div className="section-two">
        <div className="section-two-image">
          <img src="/assets/images/package-image.png" alt="" />
        </div>
        <div className="section-two-text">
          <div className="logo">
            <img src="/assets/images/check-logo.png" alt="" />
            <p>Optimized</p>
          </div>
          <div className="description">
            <h3>Everything you need in one place</h3>
            <p>
              You can specify additional info in task description and assign
              users.
            </p>
          </div>
        </div>
      </div>

      <div className="section-three">
        <div className="section-three-text">
          <div className="logo">
            <img src="/assets/images/check-logo.png" alt="" />
            <p>Unlimited</p>
          </div>
          <div className="description">
            <h3>No limits for all users.</h3>
            <p>Unlimited kanban boards, columns and tasks.</p>
          </div>
        </div>
        <div className="section-three-image">
          <img className="img-1" src="/assets/images/signup-image.png" alt="" />
          <img
            className="img-2"
            src="/assets/images/concept-image.png"
            alt=""
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
