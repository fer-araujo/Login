import React, { useState, useRef } from "react";
import Input from "../Includes/Inputs";
import Messages from "../Includes/Messages";
import { getUser } from "../Helpers/localStorage";
import { useNavigate } from "react-router";
import "./Users.css";

const Forgot = ({ close }) => {
  const history = useNavigate();

  const emailRef = useRef();

  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    const user = getUser({ email: email });
    if (user) {
      close();
      setEmail("");
      history("/recover", { state: { userId: user.id } });
    } else {
      setMessage("We couldn't find an account with your email address");
      setSuccess(false);
      setShowMsg(true);
      setEmail("");
      setTimeout(() => {
        setShowMsg(false);
        setMessage("");
      }, 3000);
    }
  };

  return (
    <form className="App__forgot-form" onSubmit={handleForgotSubmit}>
      <Input
        type="email"
        label="Email"
        id="emailRecover"
        refer={emailRef}
        value={email}
        placeholder="Enter your email"
        handleChange={handleInputEmail}
        handleBlurOut={true}
      />

      <div className="App__forgot-buttons">
        <button type="submit" className="App__button-save">
          Save
        </button>
        <button
          type="button"
          className="App__button-cancel"
          onClick={() => {
            close();
          }}
        >
          cancel
        </button>
      </div>

      <Messages show={showMsg} success={success} message={message} />
    </form>
  );
};

export default Forgot;
