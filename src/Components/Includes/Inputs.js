import React, { useState, useEffect } from "react";

const Input = ({
  label,
  type,
  refer,
  id,
  value,
  placeholder,
  handleChange,
  handleBlurOut,
  message
}) => {
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleError = () => {
    setError(handleBlurOut ? handleBlurOut : "");
  };

  useEffect(() => {
    !error ? setErrorMsg(message) : setErrorMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      {label && (
        <label htmlFor={id} className="App__form-label">
          {label}:
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={refer}
        className="App__form-input"
        onChange={handleChange}
        onBlur={handleError}
        value={value}
        placeholder={placeholder}
        required
      />
      <div className="App__error-msg">{errorMsg}</div>
    </>
  );
};

export default Input;
