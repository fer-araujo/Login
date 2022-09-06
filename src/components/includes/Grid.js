import React, { useState, useEffect } from "react";
import "./Grid.css";

const Grid = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const items = localStorage.getItem("users");
    setUsers(JSON.parse(items));
  }, []);

  return (
    <div className="App__grid">
      <h2>Registered Users</h2>
      <div className="App__grid-container">
        <div className="App__grid-head">
          <p>User</p>
          <p>Name</p>
          <p>Email</p>
          <p>Date</p>
        </div>
        <div className="App__grid-body">
          {users?.map((user, key) => (
            <div className="App__grid-row" key={key}>
              <p>{user.username}</p>
              <p>{user.name}</p>
              <p className="App__grid-email">{user.email}</p>
              <p>{user.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;
