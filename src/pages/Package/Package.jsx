import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TaskCards from "../../components/Tasks/TaskCards";
import "../Package/Package.scss";

const Package = () => {
  return (
    <>
      <Navbar />
      <div className="package">
        <div className="package-heading">
          <div className="heading-img">
            <a href="/projects">
              <img src="/assets/images/back-img.png" alt="" />
            </a>
            <h2>Board</h2>
          </div>
          <p>
            Sets targets and objectives and actively works towards them, whilst
            raising the quality of the outcomes.
          </p>
        </div>
        <TaskCards />
      </div>
      <Footer />
    </>
  );
};

export default Package;
