import React, { useState, useEffect, useRef } from "react";
import Input from "../Includes/Inputs";
import Messages from "../Includes/Messages";
import { getUser, deleteUser } from "../Helpers/localStorage";

const Delete = ({ id, callback, close }) => {
  const inputRef = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [input, setInput] = useState("");

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleValidation = () => {
    return input === username || input === email;
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    if (deleteUser(id)) {
      setSuccess(true);
      setMessage("User deleted successfully!");
      setShowMsg(true);
      setUsername("");
      setEmail("");
      setInput("");
      callback();
      close();
      setTimeout(() => {
        setShowMsg(false);
        setMessage("");
      }, 3000);
    } else {
      setInput("");
      setSuccess(false);
      setMessage(
        "Something went wrong and we couldn't delete the user. Please try again later."
      );
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    console.log("id Delete", id);

    const user = getUser({ id: id });
    console.log(user);
    setUsername(user.username);
    setEmail(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <form onSubmit={handleDeleteSubmit}>
      <p className="App__delete-text">
        If you want to delete this user,
        <br />
        please write the username or email address to confirm
      </p>

      <Input
        type="text"
        label="User"
        id="delete"
        refer={inputRef}
        value={input}
        placeholder="Enter username or email"
        handleChange={handleInput}
        handleBlurOut={handleValidation}
      />
      <div className="App__delete-buttons">
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

export default Delete;
