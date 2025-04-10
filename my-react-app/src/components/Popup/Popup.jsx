import React, { useEffect, useRef } from "react";
import "./Popup.scss";

const Popup = ({ title, children, onSubmit, onClose, btnName1, btnName2 }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popup" ref={popupRef}>
      <img
        className="popup-close"
        src="/assets/images/x.png"
        alt="Close"
        onClick={onClose}
      />
      <div className="popup-content">
        <h3>{title}</h3>
        {children}
        <div className="popup-buttons">
          <button onClick={onSubmit}>{btnName1}</button>
          <button onClick={onClose}>{btnName2}</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
