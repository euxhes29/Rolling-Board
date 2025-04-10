import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/assets/images/footer-logo.png" alt="" />
        </div>
        <div className="footer-links">
          <p>GeoBo</p>
          <p>Mrdoker1</p>
          <p>makrakvladislav</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2022. React 2022Q1</p>
      </div>
    </div>
  );
};

export default Footer;
