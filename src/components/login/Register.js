import React, { useRef, useState, useEffect } from "react";
import { USER_REGEX, EMAIL_REGEX, PWD_REGEX } from "../../constants/Constants";
import uuid4 from "uuid4";

const Register = () => {
  const usernameRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState("");
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
      setNameValidation(true);
      setErrorMsg("");
    } else {
      setNameValidation(false);
      setErrorMsg("Invalid Username");
    }
  }, [username]);

  //We will test that the email is valid
  useEffect(() => {
    if (EMAIL_REGEX.test(email)) {
      setEmailValidation(true);
      setErrorMsg("");
    } else {
      setEmailValidation(false);
      setErrorMsg("Invalid Email");
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
    if(user !== null) {
        setData([...data, user]);
        localStorage.setItem("users", JSON.stringify([...data, user]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUser(() => {
      return {
        ...user,
        id: uuid4(),
        username: username,
        email: email,
        password: password,
      };
    });

    setValid(true);
    setUsername("");
    setEmail("");
    setPassword("");
    setMatchPass("");
    setTimeout(() => {
      setValid(false);
    }, 3000);
  };

  return (
    <>
      <div>
        <p
          ref={errorRef}
          className={errorMsg ? "app__error-msg" : "app__offscreen"}
          aria-live="assertive"
        >
          {errorMsg}
        </p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {/* username input*/}
          <label htmlFor="username">
            Username:
            {nameValidation ? <span>check icon</span> : ""}
            {nameValidation || !username ? "" : <span>times icon</span>}
          </label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
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
                ? "app__instructions"
                : "app__offscreen"
            }
          >
            - The username should have a minimum of 4 characters. <br />
            - Must begin with a letter. <br />
            - Letters, numbers, hyphens and underscores allowed. <br />- Avoid
            special characters.
          </p>

          {/* email input*/}
          <label htmlFor="email">
            Email:
            {emailValidation ? <span>check icon</span> : ""}
            {emailValidation || !email ? "" : <span>times icon</span>}
          </label>
          <input
            type="email"
            id="email"
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
                ? "app__instructions"
                : "app__offscreen"
            }
          >
            - Avoid blank spaces.
          </p>

          {/* password input*/}
          <label htmlFor="password">
            Password:
            {passwordValidation ? <span>check icon</span> : ""}
            {passwordValidation || !password ? "" : <span>times icon</span>}
          </label>
          <input
            type="password"
            id="password"
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
                ? "app__instructions"
                : "app__offscreen"
            }
          >
            - The password should have a minimum of 8 characters. <br />
            - Should have at least one capital letter. <br />
            - Should have at least one lowercase letter. <br />
            - Should have at least one number. <br />- Should have at least one
            special character.
          </p>

          {/* match password input*/}
          <label htmlFor="match">
            Confirm Password:
            {matchValidation ? <span>check icon</span> : ""}
            {matchValidation || !matchPass ? "" : <span>times icon</span>}
          </label>
          <input
            type="password"
            id="match"
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
                ? "app__instructions"
                : "app__offscreen"
            }
          >
            - Must match the password
          </p>

          <button
            disabled={
              !nameValidation || !passwordValidation || !matchValidation
                ? true
                : false
            }
          >
            Sign Up
          </button>
        </form>
        {valid && (
          <p className="app__valid-msg" aria-live="assertive">
            Register completed successfully!
          </p>
        )}
        {/* CHANGE AFTER ADDING ALL THE CLASSES */}
        <p>Sign In</p>
      </div>
    </>
  );
};

export default Register;
