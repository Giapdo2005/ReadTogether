import React, { useState } from "react";
import { handleLogin } from "../api";
import "../styles/Home.css";

export function Home({ onLoggedIn }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onHandleLogin() {
    if (!email || !password) {
      console.log("Username and password are required");
    }
    try {
      const response = await handleLogin(email, password);
      onLoggedIn(response.data.fullname);
      console.log("Login successfully");
    } catch (error) {
      console.error("onLogin -> error", error);
    }
  }

  async function onHandleSignUp() {}

  return (
    <div className="intro-page">
      {/* Logo and Welcome Section */}
      <div className="welcome-section">
        <div className="logo-container">
          <span className="logo-emoji">📚</span>
          <h1 className="logo-text">LitLink</h1>
        </div>
        <p className="welcome-text">Share your reading journey with friends</p>
      </div>

      {/* Auth Card */}
      <div className="auth-card">
        {/* Toggle Buttons */}
        <div className="toggle-container">
          <button
            className={`toggle-button ${isLoginMode ? "active" : ""}`}
            onClick={() => setIsLoginMode(true)}
          >
            Login
          </button>
          <button
            className={`toggle-button ${!isLoginMode ? "active" : ""}`}
            onClick={() => setIsLoginMode(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="auth-form">
          {!isLoginMode && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm your password" />
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            onClick={isLoginMode ? onHandleLogin : onHandleSignUp}
          >
            {isLoginMode ? "Login" : "Sign Up"}
          </button>
        </form>

        {isLoginMode ? (
          <p className="footer-text">
            Forgot your password?{" "}
            <button className="text-link">Reset it here</button>
          </p>
        ) : (
          <p className="footer-text">
            By signing up, you agree to our{" "}
            <button className="text-link">Terms</button> and{" "}
            <button className="text-link">Privacy Policy</button>
          </p>
        )}
      </div>

      <div className="page-footer">
        <p>© 2024 LitLink. All rights reserved.</p>
      </div>
    </div>
  );
}
