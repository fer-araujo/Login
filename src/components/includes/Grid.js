import React, { useState, useEffect } from "react";
import { getAllUsers } from "../Helpers/localStorage";
import Modal from "./Modal";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./Includes.css";

const Grid = () => {
  const [users, setUsers] = useState(null);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(null);
  const [type, setType] = useState("");

  const toggleModal = (id, action) => {
    setUserId(id);
    setType(action);
    setShow(!show);
    // console.log(userId);
  };

  useEffect(() => {
    const items = getAllUsers();
    setUsers(items);
  }, []);

  return (
    <>
      <div className="App__grid">
        <h2 className="App__grid-title">Registered Users</h2>
        <div className="App__grid-container">
          <div className="App__grid-head">
            <p>User</p>
            <p>Name</p>
            <p>Email</p>
            <p>Date</p>
            <p>Edit - Delete</p>
          </div>
          <div className="App__grid-body">
            {users?.map((user, key) => (
              <div className="App__grid-row" key={key}>
                <p>{user.username}</p>
                <p>{user.name}</p>
                <p className="App__grid-email">{user.email}</p>
                <p>{user.date}</p>
                <p className="App__grid-buttons-container">
                  <button className="App__grid-button" onClick={() => toggleModal(user.id, "Edit")}>
                    <MdOutlineModeEdit />
                  </button>
                  <button className="App__grid-button" onClick={() => toggleModal(user.id, "Delete")}>
                    <RiDeleteBin6Line />
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        close={() => {
          setShow(!show);
        }}
        show={show}
        type={type}
        id={userId}
        callback={() => {
          setUsers(getAllUsers());
        }}
      />
    </>
  );
};

export default Grid;
