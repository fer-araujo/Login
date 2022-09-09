import React, { useState, useEffect } from "react";
import Grid from "../Includes/Grid";
import Toggle from "../Includes/Toggle";
import { useNavigate } from "react-router";
import { logoutUser } from "../Helpers/localStorage";
import "./Home.css";
import { useTheme } from "../Helpers/ThemeContext";

const Home = () => {
  const [name, setName] = useState("");
  const history = useNavigate();

  const { theme } = useTheme();

  const handleLogout = () => {
    logoutUser();
    history("/");
  };

  useEffect(() => {
    const logged = localStorage.getItem("isLogged");
    const nameStorage = localStorage.getItem("u__name");
    logged ? setName(nameStorage) : history("/login");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`App__home-${theme}`}>
        <div className={`App__home-container`}>
          <Toggle />
          <div className={`App__home-top-container`}>
            <h1>
              <span className={`App__home-title`}>Welcome</span> {name}!
            </h1>
            <button className={`App__home-logout`} onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className={`App__home-grid`}>
            <Grid />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;