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

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="popup-overlay">
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
          {(btnName1 || btnName2) && (
            <div className="popup-buttons">
              {btnName1 && onSubmit && (
                <button onClick={onSubmit}>{btnName1}</button>
              )}
              {btnName2 && <button onClick={onClose}>{btnName2}</button>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
