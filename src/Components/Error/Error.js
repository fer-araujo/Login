import React from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../Helpers/ThemeContext";
import "./Error.css";

const Error = () => {
  const history = useNavigate();
  const { theme } = useTheme();
  const isLogged = localStorage.getItem("isLogged");
  return (
    <div className={`App__error-${theme}`}>
      <div className="App__error-container">
        <h1 className={`App__error-title`}>
          Error 404, The site does not exist!
        </h1>
        {!isLogged ? (
          <button
            className={`App__error-button`}
            onClick={() => {
              history("/login");
            }}
          >
            Back to Login
          </button>
        ) : (
          <button
            className={`App__error-button`}
            onClick={() => {
              history("/home");
            }}
          >
            Back to Home
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;
