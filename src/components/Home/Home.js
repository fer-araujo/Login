import React, { useState, useEffect } from "react";
import Grid from "../includes/Grid";
import { useNavigate } from "react-router";
import "./Home.css";

const Home = () => {
  const [name, setName] = useState("");
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("u__uuid");
    localStorage.removeItem("u__username");
    localStorage.removeItem("u__name");
    localStorage.removeItem("u__email");
    localStorage.removeItem("u__date");
    history("/");
  };

  useEffect(() => {
    const temp = localStorage.getItem("u__name");
    temp === null ? history("/") : setName((temp));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="App__home">
        <div className="App__home-container">
          <div className="App__home-top-container">
            <h1>
              <span className="App__home-title">Welcome</span> {name}!!
            </h1>
            <button className="App__home-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="App__home-grid">
            <Grid />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
