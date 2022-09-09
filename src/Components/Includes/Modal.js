import React, { useState, useEffect } from "react";
import Edit from "../Users/Edit";
import Delete from "../Users/Delete";
import Forgot from "../Users/Forgot";
import { useTheme } from "../Helpers/ThemeContext";

const Modal = ({ close, show, type, id, callback }) => {
  const display = show ? "App__modal-show" : "";
  const { theme } = useTheme();
  const [component, setComponent] = useState(<></>);

  useEffect(() => {
    switch (type) {
      case "Edit":
        setComponent(<Edit id={id} callback={callback} close={close} />);
        break;
      case "Delete":
        setComponent(<Delete id={id} callback={callback} close={close} />);
        break;

      case "Forgot":
        setComponent(<Forgot close={close} />);
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <>
      <div className={`App__modal-${theme} ${display}`}>
        <div className="App__modal-content">
          <span
            className="App__modal-close"
            onClick={() => {
              close();
            }}
          >
            &times;
          </span>
          <h3 className="App__modal-title">
            {type === "Forgot" ? "Forgot Password" : type + " User"}{" "}
          </h3>
          <div className="App__modal-body">{component}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
