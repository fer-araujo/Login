import React from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../Helpers/ThemeContext";

const Error = () => {
  const history = useNavigate();
  const { theme } = useTheme();
  const isLogged = localStorage.getItem("isLogged");
  return (
    <div className={`App__error-${theme}`}>
      <h1 className={`App__error-title-${theme}`}>
        Error 404, The site does not exist!
      </h1>
      {!isLogged ? (
        <button
          className={`App__error-button-${theme}`}
          onClick={() => {
            history("/login");
          }}
        >
          Back to Login
        </button>
      ) : (
        <button
          className={`App__error-button-${theme}`}
          onClick={() => {
            history("/home");
          }}
        >
          Back to Home
        </button>
      )}
    </div>
  );
};

export default Error;
