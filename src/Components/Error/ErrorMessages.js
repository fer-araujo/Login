import React from "react";

const Errors = ({ type }) => {
  const Username = () => {
    return (
      <div className="App__failure">
        <p>- The username should have a minimum of 4 characters. </p>
        <p>- Must begin with a letter. </p>
        <p>- Letters, numbers, hyphens and underscores allowed.</p>
        <p>- Avoid special characters.</p>
      </div>
    );
  };
  const Name = () => {
    return (
      <div className="App__failure">
        <p>- The name should have a minimum of 2 characters. </p>
        <p>- Must begin with a capital letter. </p>
        <p>- Avoid special characters and numbers.</p>
      </div>
    );
  };
  const Email = () => {
    return (
      <div className="App__failure">
        <p>- Please avoid using blank spaces</p>
        <p>- Your email should contain an @. </p>
        <p>- Avoid special characters.</p>
      </div>
    );
  };
  const Password = () => {
    return (
      <div className="App__failure">
        <p>- The password should have a minimum of 8 characters. </p>
        <p>- Should have at least one capital letter. </p>
        <p>- Should have at least one lowercase letter. </p>
        <p>- Should have at least one number. </p>
        <p>- Should have at least one special character.</p>
      </div>
    );
  };
  const Confirm = () => {
    return (
      <div className="App__failure">
        <p>- Must match the password. </p>
      </div>
    );
  };
  const User = () => {
    return (
      <div className="App__failure">
        <p>- Remember you can put your email account or your username. </p>
        <p>- Your email should contain an @. </p>
        <p>- Avoid special characters.</p>
      </div>
    );
  };
  const ENUM_STATES = {
    Username: <Username />,
    Name: <Name />,
    Email: <Email />,
    Password: <Password />,
    Confirm: <Confirm />,
    User: <User />,
  };

  return <div>{ENUM_STATES[type]}</div>;
};

export default Errors;
