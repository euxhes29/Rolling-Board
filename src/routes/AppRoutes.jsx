import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Projects from "../pages/Projects";
import Package from "../pages/Package";
import PrivateRoute from "./PrivateRoute";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/login"
        element={
          <RedirectIfAuthenticated>
            <Login />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/signup"
        element={
          <RedirectIfAuthenticated>
            <SignUp />
          </RedirectIfAuthenticated>
        }
      />
      <Route path="/projects" element={<PrivateRoute element={Projects} />} />
      <Route
        path="/projects/:id"
        element={<PrivateRoute element={Package} />}
      />
    </Routes>
  </Router>
);

export default AppRoutes;
