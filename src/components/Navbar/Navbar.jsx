import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Buttons";
import EditProfilePopup from "../Popup/EditProfilePopup";
import "./Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(true);
  };

  const handleCloseProfileClick = () => {
    setIsProfileMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <img src="/assets/images/v3-logo.png" alt="logo" />
            <p>RollingBoard</p>
          </Link>
        </div>

        <ul className={`Links ${isMenuOpen ? "open" : ""}`}>
          {isLoggedIn && (
            <li>
              <a href="/projects">Projects</a>
            </li>
          )}
          {isLoggedIn && (
            <li className="profile" onClick={handleProfileClick}>
              Profile
            </li>
          )}
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            English <i className="fi fi-ts-angle-small-down"></i>
          </li>
          <li className="mobile">
            <Button variant="text" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="ghost" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </li>
        </ul>

        <div className="login-signup">
          {isLoggedIn ? (
            <Button variant="text" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="text" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="ghost" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        <div
          className={`closeMenu ${isMenuOpen ? "show" : ""}`}
          onClick={handleMenuToggle}
        >
          <i className="fi fi-br-cross"></i>
        </div>
        <div
          className={`openMenu ${isMenuOpen ? "hide" : ""}`}
          onClick={handleMenuToggle}
        >
          <i className="fi fi-br-bars-sort"></i>
        </div>
      </div>
      <EditProfilePopup
        isProfileMenuOpen={isProfileMenuOpen}
        handleCloseProfileClick={handleCloseProfileClick}
      />
    </>
  );
};

export default Navbar;
