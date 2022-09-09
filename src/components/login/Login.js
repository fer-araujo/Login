import React, { useState, useRef } from "react";
import { useTheme } from "../Helpers/ThemeContext";
import Input from "../Includes/Inputs";
import Messages from "../Includes/Messages";
import { USER_REGEX, EMAIL_REGEX, PWD_REGEX } from "../Constants/Constants";
import { loginUser } from "../Helpers/localStorage";
import Modal from "../Includes/Modal";
import { useNavigate } from "react-router";
import Errors from "../Error/ErrorMessages";

const Register = () => {
  const history = useNavigate();
  const { theme } = useTheme();

  const userRef = useRef();
  const passwordRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const [show, setShow] = useState(false);

  const handleInputUser = (e) => {
    setUser(e.target.value);
  };

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleValidation = (value) => {
    switch (value) {
      case "user":
        if (user.includes("@") || user.includes(".com")) {
          return user !== "" ? EMAIL_REGEX.test(user) : true;
        }
        return user !== "" ? USER_REGEX.test(user) : true;
      case "password":
        return password !== "" ? PWD_REGEX.test(password) : true;
      default:
        break;
    }
  };

  const handleForgot = () => {
    setShow(!show);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const userParams = { user, password };

    if (loginUser(userParams)) {
      history("/Home");
      setMessage("Login successful");
      setSuccess(true);
      setShowMsg(true);
      setUser("");
      setPassword("");
      setTimeout(() => {
        setShowMsg(false);
        setMessage("");
      }, 3000);
    } else {
      setMessage("Your username/email or password are incorrect");
      setSuccess(false);
      setShowMsg(true);

      setTimeout(() => {
        setShowMsg(false);
        setMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <div className={`App__login-container-${theme}`}>
        <form className={`App__login-form`} onSubmit={handleLoginSubmit}>
          <h1 className={`App__login-title`}>Login</h1>

          <Input
            type="text"
            label="User"
            id="user"
            refer={userRef}
            value={user}
            placeholder="Enter your username or email address"
            handleChange={handleInputUser}
            handleBlurOut={handleValidation("user")}
            message={<Errors type="User" />}
          />

          <Input
            type="password"
            label="Password"
            id="passwordLogin"
            refer={passwordRef}
            value={password}
            placeholder="Enter your password"
            handleChange={handleInputPassword}
            handleBlurOut={handleValidation("password")}
            message={<Errors type="Password" />}
          />
          <button
            type="button"
            className={`App__login-forgot`}
            onClick={handleForgot}
          >
            Forgot your password?
          </button>
          <button type="submit" className={`App__login-button`}>
            Login
          </button>
          <Messages show={showMsg} success={success} message={message} />
        </form>
      </div>
      <Modal
        close={() => {
          setShow(false);
        }}
        show={show}
        type="Forgot"
      />
    </>
  );
};

export default Register;
