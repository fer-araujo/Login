import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import Toggle from "../Includes/Toggle";
import "./Login.css";
import { useTheme } from "../Helpers/ThemeContext";

const Panel = () => {
  const [container, setContainer] = useState();
  const { theme } = useTheme();
  useEffect(() => {
    const element = document.querySelector(".App__container");
    setContainer(element);
  }, []);

  const toggleAnimation = () => {
    container.classList.toggle("App__forms-transition");
  };

  return (
    <div className={`App__${theme}`}>
      <div className="App__container">
        <Toggle />
        <div className="App__forms-container ">
          <div className="App__forms">
            <Login />
            <Register />
          </div>
        </div>
        <div className="App__panels-container">
          <div className="App__panel App__left-panel">
            <div className="App__panel-content">
              <h3>One of us ?</h3>
              <p>
                If you already had an account please enter your credentials!
                <br />
                We are happy to see you again!
              </p>
              <button
                className="App__panel-button"
                onClick={toggleAnimation}
                id="login"
              >
                Login
              </button>
            </div>
          </div>
          <div className="App__panel App__right-panel">
            <div className="App__panel-content">
              <h3>New here ?</h3>
              <p>
                Create an account and join our fantastic team!
                <br />
                We are more than happy to welcome you!
              </p>
              <button
                className="App__panel-button"
                onClick={toggleAnimation}
                id="register"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
