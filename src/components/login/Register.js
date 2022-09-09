import React, { useState, useRef } from "react";
import Input from "../Includes/Inputs";
import Messages from "../Includes/Messages";
import {
  USER_REGEX,
  NAME_REGEX,
  EMAIL_REGEX,
  PWD_REGEX,
} from "../Constants/Constants";
import { addUser } from "../Helpers/localStorage";
import Errors from "../Error/ErrorMessages";
import uuid4 from "uuid4";
import { useTheme } from "../Helpers/ThemeContext";

const Register = () => {
  const usernameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const matchRef = useRef();

  const { theme } = useTheme();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [match, setMatch] = useState("");

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const handleInputUser = (e) => {
    setUsername(e.target.value);
  };

  const handleInputName = (e) => {
    setName(e.target.value);
  };

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleInputMatch = (e) => {
    setMatch(e.target.value);
  };

  const handleValidation = (value) => {
    switch (value) {
      case "username":
        return username !== "" ? USER_REGEX.test(username) : true;
      case "name":
        return name !== "" ? NAME_REGEX.test(name) : true;
      case "email":
        return email !== "" ? EMAIL_REGEX.test(email) : true;
      case "password":
        return password !== "" ? PWD_REGEX.test(password) : true;
      case "match":
        return password === match;
      default:
        break;
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const userParams = {
      id: uuid4(),
      username,
      name,
      email,
      password,
      date: new Date().toISOString().slice(0, 10),
    };

    if (addUser(userParams)) {
      setSuccess(true);
      setMessage("User registered successfully!");
      setShowMsg(true);
      setUsername("");
      setEmail("");
      setName("");
      setPassword("");
      setMatch("");

      setTimeout(() => {
        setShowMsg(false);
        setMessage("");
      }, 3000);
    } else {
      setSuccess(false);
      setMessage(
        "There is already a user with this username or email in the system"
      );
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className={`App__register-container-${theme}`}>
      <form className="App__register-form" onSubmit={handleRegisterSubmit}>
        <h1 className="App__register-title">Register</h1>

        <Input
          type="text"
          label="Username"
          id="username"
          refer={usernameRef}
          value={username}
          placeholder="Enter your username"
          handleChange={handleInputUser}
          handleBlurOut={handleValidation("username")}
          message={<Errors type="Username" />}
        />

        <Input
          type="text"
          label="Name"
          id="name"
          refer={nameRef}
          value={name}
          placeholder="Enter your name"
          handleChange={handleInputName}
          handleBlurOut={handleValidation("name")}
          message={<Errors type="Name" />}
        />

        <Input
          type="email"
          label="Email"
          id="email"
          refer={emailRef}
          value={email}
          placeholder="Enter your email"
          handleChange={handleInputEmail}
          handleBlurOut={handleValidation("email")}
          message={<Errors type="Email" />}
        />

        <Input
          type="password"
          label="Password"
          id="password"
          refer={passwordRef}
          value={password}
          placeholder="Enter your password"
          handleChange={handleInputPassword}
          handleBlurOut={handleValidation("password")}
          message={<Errors type="Password" />}
        />

        <Input
          type="password"
          label="Confirm Password"
          id="match"
          refer={matchRef}
          value={match}
          placeholder="Confirm your password"
          handleChange={handleInputMatch}
          handleBlurOut={handleValidation("match")}
          message={<Errors type="Confirm" />}
        />

        <button className="App__register-button">Register</button>

        <Messages show={showMsg} success={success} message={message} />
      </form>
    </div>
  );
};

export default Register;
