import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import "../pages/AboutPage.scss";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="about">
        <div className="about-heading">
          <h2>About Project</h2>
        </div>
        <div className="about-card">
          <div className="about-card-name">
            <h3>Alex</h3>
            <img src="/assets/images/about-card-icon.png" alt="" />
          </div>
          <div className="badge">
            <span className="badge-1">DESIGN</span>
            <span className="badge-2">API</span>
            <span className="badge-3">FEATURES</span>
          </div>
          <p>
            Made design, api requests, statistics, sprint game, made some
            typesetting and supervised the development.
          </p>
        </div>
        <div className="about-card-2">
          <div className="about-card-name">
            <h3>Gabriel</h3>
            <img src="/assets/images/about-card-icon.png" alt="" />
          </div>
          <div className="badge">
            <span className="badge-4">ROUTER</span>
            <span className="badge-5">API</span>
            <span className="badge-6">FEATURES</span>
          </div>
          <p>
            Authorization / registration module, "Audio call" game, statistics
            collection, routing, typing of studied words.
          </p>
        </div>
        <div className="about-card">
          <div className="about-card-name">
            <h3>Marcus</h3>
            <img src="/assets/images/about-card-icon.png" alt="" />
          </div>
          <div className="badge">
            <span className="badge-7">MARKUP</span>
            <span className="badge-8">API</span>
            <span className="badge-9">FEATURES</span>
          </div>
          <p>
            Made the main page of the application, an electronic textbook,
            layout and adaptive.
          </p>
        </div>
      </div>
      <div className="languages">
        <p>Build With</p>
        <div className="languages-icons">
          <img src="/assets/images/frame.png" alt="" />
          <img src="/assets/images/react-logo.png" alt="" />
          <img src="/assets/images/ts-icon.png" alt="" />
          <img src="/assets/images/redux-icon.png" alt="" />
          <img src="/assets/images/group 2.png" alt="" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
