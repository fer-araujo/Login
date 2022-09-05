import React, { useRef, useState, useEffect } from "react";
import { USER_REGEX, PWD_REGEX } from "../../constants/Constants";
import { FcCheckmark, FcHighPriority } from "react-icons/fc";
import "./Login.scss";

const Register = () => {
  const usernameLoginRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState("");
  const [nameValidation, setNameValidation] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [valid, setValid] = useState(false);

  //We will test that the username is valid
  useEffect(() => {
    if (USER_REGEX.test(username)) {
      setNameValidation(true);
      setErrorMsg("");
    } else {
      setNameValidation(false);
      username !== "" ? setErrorMsg("Invalid Username") : setErrorMsg("");
    }
  }, [username]);

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
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usersArr = localStorage.getItem("users");
    if (usersArr && usersArr.length) {
      const userData = JSON.parse(usersArr);
      const userLogin = userData.filter((user, key) => {
        return user.username === username && user.password === password;
      });

      if (userLogin.length > 0) {
        console.log("user login successfully!");
        localStorage.setItem("u__uuid", userLogin.id);
        localStorage.setItem("u__username", userLogin.username);
        localStorage.setItem("u__email", userLogin.email);
        setValid(true);
        setUsername("");
        setPassword("");
        setTimeout(() => {
          setValid(false);
        }, 3000);
      } else {
        setErrorMsg("Invalid username or password");
        setUsername("");
        setPassword("");
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      }
    }
  };

  return (
    <>
      <form className="App__form-login" onSubmit={handleSubmit}>
        
        <h1>Login</h1>
        <p
          ref={errorRef}
          className={errorMsg ? "App__error" : "App__offscreen"}
          aria-live="assertive"
        >
          {errorMsg}
        </p>
        {/* username input*/}
        <label htmlFor="usernameLogin" className="App__form-label">
          Username:
          {nameValidation ? <FcCheckmark /> : ""}
          {nameValidation || !username ? "" : <FcHighPriority />}
        </label>
        <input
          type="text"
          id="usernameLogin"
          ref={usernameLoginRef}
          className="App__form-input"
          onChange={(e) => setUsername(e.target.value)}
          aria-invalid={nameValidation ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
          value={username ? username : ""}
          required
        />
        <p
          id="uidnote"
          className={
            nameFocus && username && !nameValidation
              ? "App__instructions"
              : "App__offscreen"
          }
        >
          - Remember the username should have a minimum of 4 characters. <br />
        </p>

        {/* password input*/}
        <label htmlFor="passwordLogin" className="App__form-label">
          Password:
          {passwordValidation ? <FcCheckmark /> : ""}
          {passwordValidation || !password ? "" : <FcHighPriority />}
        </label>
        <input
          type="password"
          id="passwordLogin"
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
          - Remember the password should have a minimum of 8 characters. <br />
          - Have at least one capital letter. <br />
          - Have at least one lowercase letter. <br />
          - Have at least one number. <br />- Have at least one special
          character.
        </p>

        <button
          className="App__form-button"
          disabled={!nameValidation || !passwordValidation ? true : false}
        >
          Login
        </button>
        {valid && (
          <p className="App__valid-msg" aria-live="assertive">
            Login successfully!
          </p>
        )}
      </form>
    </>
  );
};

export default Register;
