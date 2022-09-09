import React, { useState, useEffect, useRef } from "react";
import Input from "../Includes/Inputs";
import Toggle from "../Includes/Toggle";
import { useLocation, useNavigate } from "react-router-dom";
import { PWD_REGEX } from "../Constants/Constants";
import { updateUser } from "../Helpers/localStorage";
import Messages from "../Includes/Messages";
import Errors from "../Error/ErrorMessages";
import { useTheme } from "../Helpers/ThemeContext";
import "./Recover.css";

const Recover = () => {
  const history = useNavigate();
  const { theme } = useTheme();
  const location = useLocation();

  const passwordRef = useRef();
  const matchRef = useRef();

  const [userId, setUserId] = useState("");

  const [password, setPassword] = useState("");
  const [match, setMatch] = useState("");

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleInputMatch = (e) => {
    setMatch(e.target.value);
  };

  const handleBack = () => {
    history("/login");
  };

  const handleValidation = (value) => {
    switch (value) {
      case "password":
        return password !== "" ? PWD_REGEX.test(password) : true;
      case "match":
        return password === match;
      default:
        break;
    }
  };

  const handleRecoverSubmit = async (e) => {
    e.preventDefault();
    const id = userId;
    const userParams = {
      id,
      password,
    };

    if (updateUser(userParams)) {
      setSuccess(true);
      setMessage("Password updated successfully!");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setMessage("");
        history("/login");
      }, 3000);
    } else {
      setSuccess(false);
      setMessage(
        "Something went wrong and we couldn't update the password. Please try again later."
      );
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    location.state !== null
      ? setUserId(location.state.userId)
      : history("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`App__recover-${theme}`}>
      <Toggle />
      <div className="App__recover-container">
        <h1 className="App__title">Recover</h1>

        <form onSubmit={handleRecoverSubmit}>
          <Input
            type="password"
            label="Password"
            id="passwordRecover"
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
            id="matchRecover"
            refer={matchRef}
            value={match}
            placeholder="Confirm your password"
            handleChange={handleInputMatch}
            handleBlurOut={handleValidation("match")}
            message={<Errors type="Confirm" />}
          />
          <div className="App__recover-buttons">
            <button type="submit" className="App__button-save">
              Save
            </button>
            <button
              type="button"
              className="App__button-cancel"
              onClick={handleBack}
            >
              cancel
            </button>
          </div>
          <Messages show={showMsg} success={success} message={message} />
        </form>
      </div>
    </div>
  );
};

export default Recover;
