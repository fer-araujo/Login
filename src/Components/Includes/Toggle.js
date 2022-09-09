import React from 'react'
import { useTheme } from '../Helpers/ThemeContext';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import "../Login/Login.css";

const Toggle = () => {
    const { theme, toggleTheme } = useTheme();
  return (
    <div className="App__btn-container">
    <button
      type="button"
      className="App__theme-button"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <MdOutlineLightMode className="app__dark-icon" />
      ) : (
        <MdOutlineDarkMode className="app__light-icon" />
      )}
    </button>
  </div>
  )
}

export default Toggle