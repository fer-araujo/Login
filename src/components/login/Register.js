import React, { useRef, useState, useEffect } from "react";
import {
  USER_REGEX,
  NAME_REGEX,
  EMAIL_REGEX,
  PWD_REGEX,
} from "../../constants/Constants";
import uuid4 from "uuid4";
import { FcCheckmark, FcHighPriority } from "react-icons/fc";
import "./Login.css";

const Register = () => {
  const usernameRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState("");
  const [usernameValidation, setUsernameValidation] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [name, setName] = useState("");
  const [nameValidation, setNameValidation] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPass, setMatchPass] = useState("");
  const [matchValidation, setMatchValidation] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [valid, setValid] = useState(false);

  const [user, setUser] = useState(null);

  const [data, setData] = useState([]);

  //Focus will start on username input
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  //We will test that the username is valid
  useEffect(() => {
    if (USER_REGEX.test(username)) {
      setUsernameValidation(true);
      setErrorMsg("");
    } else {
      setUsernameValidation(false);
      username !== "" ? setErrorMsg("Invalid Username") : setErrorMsg("");
    }
  }, [username]);

  //We will test that the name is valid
  useEffect(() => {
    if (NAME_REGEX.test(name)) {
      setNameValidation(true);
      setErrorMsg("");
    } else {
      setNameValidation(false);
      name !== "" ? setErrorMsg("Invalid Name") : setErrorMsg("");
    }
  }, [name]);

  //We will test that the email is valid
  useEffect(() => {
    if (EMAIL_REGEX.test(email)) {
      setEmailValidation(true);
      setErrorMsg("");
    } else {
      setEmailValidation(false);
      email !== "" ? setErrorMsg("Invalid Email") : setErrorMsg("");
    }
  }, [email]);

  //We will test that the password is valid
  // and that the password is equal to the match
  useEffect(() => {
    if (PWD_REGEX.test(password)) {
      setPasswordValidation(true);
      setErrorMsg("");
    } else {
      setPasswordValidation(false);
      password !== "" ? setErrorMsg("Invalid Password") : setErrorMsg("");
    }
    password === matchPass && matchPass !== ""
      ? setMatchValidation(true)
      : setMatchValidation(false);
  }, [password, matchPass]);

  useEffect(() => {
    if (user !== null) {
      setData([...data, user]);
      localStorage.setItem("users", JSON.stringify([...data, user]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usersArr = localStorage.getItem("users");
    if (usersArr && usersArr.length) {
      setUser(() => {
        const date = new Date().toISOString().slice(0, 10);
        const tempObj = {
          ...user,
          usersArr,
        };
        return {
          ...tempObj,
          id: uuid4(),
          username: username,
          name: name,
          email: email,
          password: password,
          date: date,
        };
      });
    } else {
      setUser(() => {
        const date = new Date().toISOString().slice(0, 10);
        return {
          ...user,
          id: uuid4(),
          username: username,
          name: name,
          email: email,
          password: password,
          date: date,
        };
      });
    }

    setValid(true);
    setUsername("");
    setName("");
    setEmail("");
    setPassword("");
    setMatchPass("");
    setTimeout(() => {
      setValid(false);
    }, 3000);
  };

  return (
    <>
      <form
        className="App__form-register"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h1>Register</h1>

        <p
          ref={errorRef}
          className={errorMsg ? "App__error" : "App__offscreen"}
          aria-live="assertive"
        >
          {errorMsg}
        </p>

        {/* username input*/}
        <label htmlFor="username" className="App__form-label">
          Username:
          {usernameValidation ? <FcCheckmark /> : ""}
          {usernameValidation || !username ? "" : <FcHighPriority />}
        </label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          className="App__form-input"
          onChange={(e) => setUsername(e.target.value)}
          aria-invalid={usernameValidation ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
          value={username ? username : ""}
          required
        />
        <p
          id="uidnote"
          className={
            usernameFocus && username && !usernameValidation
              ? "App__instructions"
              : "App__offscreen"
          }
        >
          - The username should have a minimum of 4 characters. <br />
          - Must begin with a letter. <br />
          - Letters, numbers, hyphens and underscores allowed. <br />- Avoid
          special characters.
        </p>

        {/* name input*/}
        <label htmlFor="name" className="App__form-label">
          Name:
          {nameValidation ? <FcCheckmark /> : ""}
          {nameValidation || !name ? "" : <FcHighPriority />}
        </label>
        <input
          type="text"
          id="name"
          className="App__form-input"
          onChange={(e) => setName(e.target.value)}
          aria-invalid={usernameValidation ? "false" : "true"}
          aria-describedby="namenote"
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
          value={name ? name : ""}
          required
        />
        <p
          id="namenote"
          className={
            nameFocus && name && !nameValidation
              ? "App__instructions"
              : "App__offscreen"
          }
        >
          - The name should have a minimum of 2 characters. <br />
          - Must begin with a letter. <br />- Avoid special characters.
        </p>

        {/* email input*/}
        <label htmlFor="email" className="App__form-label">
          Email:
          {emailValidation ? <FcCheckmark /> : ""}
          {emailValidation || !email ? "" : <FcHighPriority />}
        </label>
        <input
          type="email"
          id="email"
          className="App__form-input"
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={emailValidation ? "false" : "true"}
          aria-describedby="emailnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          value={email ? email : ""}
          required
        />
        <p
          id="emailnote"
          className={
            emailFocus && email && !emailValidation
              ? "App__instructions"
              : "App__offscreen"
          }
        >
          - Avoid blank spaces.
        </p>

        {/* password input*/}
        <label htmlFor="password" className="App__form-label">
          Password:
          {passwordValidation ? <FcCheckmark /> : ""}
          {passwordValidation || !password ? "" : <FcHighPriority />}
        </label>
        <input
          type="password"
          id="password"
          className="App__form-input"
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={passwordValidation ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          value={password ? password : ""}
          required
        />
        <p
          id="pwdnote"
          className={
            passwordFocus && password && !passwordValidation
              ? "App__instructions"
              : "App__offscreen"
          }
        >
          - The password should have a minimum of 8 characters. <br />
          - Should have at least one capital letter. <br />
          - Should have at least one lowercase letter. <br />
          - Should have at least one number. <br />- Should have at least one
          special character.
        </p>

        {/* match password input*/}
        <label htmlFor="match" className="App__form-label">
          Confirm Password:
          {matchValidation ? <FcCheckmark /> : ""}
          {matchValidation || !matchPass ? "" : <FcHighPriority />}
        </label>
        <input
          type="password"
          id="match"
          className="App__form-input"
          onChange={(e) => setMatchPass(e.target.value)}
          aria-invalid={matchValidation ? "false" : "true"}
          aria-describedby="matchnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          value={matchPass ? matchPass : ""}
          required
        />
        <p
          id="matchnote"
          className={
            matchFocus && matchPass && !matchValidation
              ? "App__instructions"
              : "App__offscreen"
          }
        >
          - Must match the password
        </p>

        <button
          className="App__form-button"
          disabled={
            !usernameValidation || !passwordValidation || !matchValidation
              ? true
              : false
          }
        >
          Sign Up
        </button>
        {valid && (
          <p className="App__valid-msg" aria-live="assertive">
            Register completed successfully!
          </p>
        )}
      </form>
    </>
  );
};

export default Register;
