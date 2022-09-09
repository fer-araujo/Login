import React, { useState, useEffect, useRef } from "react";
import Input from "../Includes/Inputs";
import Messages from "../Includes/Messages";
import { USER_REGEX, NAME_REGEX, EMAIL_REGEX } from "../Constants/Constants";
import { getUser, updateUser } from "../Helpers/localStorage";
import Errors from "../Error/ErrorMessages";

const Edit = ({ id, callback, close }) => {
  const usernameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  const handleValidation = (value) => {
    switch (value) {
      case "username":
        return USER_REGEX.test(username);
      case "name":
        return NAME_REGEX.test(name);
      case "email":
        return EMAIL_REGEX.test(email);
      default:
        break;
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const userParams = {
      id,
      username,
      name,
      email,
    };

    if (updateUser(userParams)) {
      setSuccess(true);
      setMessage("User updated successfully!");
      setShowMsg(true);
      setUsername("");
      setEmail("");
      setName("");
      callback();
      close();
      setTimeout(() => {
        setShowMsg(false);
        setMessage("");
      }, 3000);
    } else {
      setSuccess(false);
      setMessage(
        "Something went wrong and we couldn't update the user. Please try again later."
      );
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    const user = getUser({ id: id });
    setUsername(user.username);
    setEmail(user.email);
    setName(user.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <form className="App__register-form" onSubmit={handleEditSubmit}>
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
      <div className="App__edit-buttons">
        <button type="submit" className="App__button-save">
          Save
        </button>
        <button type="button" className="App__button-cancel" onClick={close}>
          cancel
        </button>
      </div>

      <Messages show={showMsg} success={success} message={message} />
    </form>
  );
};

export default Edit;
