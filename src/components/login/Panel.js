import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import login from "../../assets/Mobile-login-RED.png";
import register from "../../assets/Registro-2.png";
import Forgot from "./Forgot";

import "./Login.css";

const Panel = () => {
  const [container, setContainer] = useState();
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  }

  useEffect(() => {
    const element = document.querySelector(".App__container");

    setContainer(element);
  }, []);

  const toggleAnimation = () => {
    container.classList.toggle("App__animation");
  };

  return (
    <>
      <div className="App__container">
        <div className="App__forms-container">
          <div className="App__forms">
            <Login show={showModal} />
            <Register />
          </div>
        </div>
        <div className="App__panels-container">
          <div className="App__panel App__left-panel">
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
            <div className="App__panel-image-container">
              <img src={login} className="App__panel-image" alt="login" />
            </div>
          </div>
          <div className="App__panel App__right-panel">
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
            <div className="App__panel-image-container">
              <img src={register} className="App__panel-image" alt="register" />
            </div>
          </div>
        </div>
      </div>
      <Forgot
        close={() => {
          setShow(false);
        }}
        show={show}
      />
    </>
  );
};

export default Panel;
