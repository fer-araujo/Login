import React, { useState } from "react";
import "./Forgot.css";

const Forgot = ({ close, show }) => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const display = show ? "App__modal-show" : "";

  const handleEmail = () => {
    const usersArr = localStorage.getItem("users");

    if (usersArr && usersArr.length) {
      const userData = JSON.parse(usersArr);
      const userEmail = userData.filter((user) => {
        return user.email === email;
      });

      if (userEmail.length > 0) {
        setUser(userEmail);
      } else {
        setErrorMsg("We couldn't find any user with that email address");
        setTimeout(() => {
          setErrorMsg("");
        }, 4000);
      }
    } else {
      setErrorMsg("We couldn't find any user with that email address");
      setTimeout(() => {
        setErrorMsg("");
      }, 4000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usersArr = localStorage.getItem("users");
    const parseUsers = JSON.parse(usersArr);
    let userTemp = parseUsers.find((user) => user.email === email);
    if (userTemp) {
      userTemp.password = password;
    }

    localStorage.setItem("users", JSON.stringify(parseUsers));
    setEmail("");
    setPassword("");
    setUser(null);
  };

  return (
    <>
      <div className={`App__modal ${display}`}>
        <div className="App__modal-content">
          <span
            className="App__modal-close"
            onClick={() => {
              setEmail("");
              setPassword("");
              setUser(null);
              close()
            }}
          >
            &times;
          </span>
          <h2>Recover Password</h2>
          <p>Please enter your email address</p>
          <form onSubmit={handleSubmit}>
            {/* email input*/}
            <label htmlFor="emailModal" className="App__modal-label">
              Email:
            </label>
            <input
              type="email"
              id="emailModal"
              className="App__modal-input"
              onChange={(e) => setEmail(e.target.value)}
              value={email ? email : ""}
              required
            />
            <button
              type="button"
              onClick={handleEmail}
              className="App__modal-button-outline"
            >
              Validate
            </button>
            {user !== null ? (
              <>
                <label htmlFor="passwordModal" className="App__modal-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="passwordmodal"
                  className="App__modal-input"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password ? password : ""}
                  required
                />
                <button type="submit" className="App__modal-button">
                  Save
                </button>
              </>
            ) : (
              <p className="App__modal-error" aria-live="assertive">
                {errorMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgot;
