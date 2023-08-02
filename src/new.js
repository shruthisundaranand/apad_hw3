import React, { useState } from 'react';

export function Form() {
  /* Stateful variables to hold user input and server response */
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  /* Stateful variables to handle error and success messages */
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  /* Method to handle input change */
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  /* Method to handle form submission */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '') {
      setError(true);
    } else {
      setSubmitted(true);
      var fetchURL = "/getLastName/" + name; // Add a slash between the URL and the name
      fetch(fetchURL)
        .then((response) => response.text())
        .then(function (data) {
          data = JSON.parse(data);

          if (data.code === 200) {
            setLastName(data.name);
            setError(false);
          } else {
            setError(true);
            setLastName("response code: " + data.code + " and message received " + data.error);
          }
        });
    }
  };

  /* Method to display success message */
  const successMessage = () => {
    return (
      <>
        <div className="success" style={{ display: submitted ? 'block' : 'none' }}>
          <p>Response from backend: "{lastName}"</p>
        </div>
      </>
    );
  };

  /* Method to display error message */
  const errorMessage = () => {
    return (
      <div className="error" style={{ display: error ? '' : 'none' }}>
        <p>Please enter a valid first name</p>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h3>Enter First Name</h3>
      </div>

      <form>
        <label id="lbl" className="label">
          First Name:
        </label>
        <input
          id="inp"
          onChange={handleName}
          className="input"
          value={name}
          type="text"
        />
        <button onClick={handleSubmit} className="btn" type="submit" id="sub">
          Submit
        </button>
      </form>
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
    </div>
  );
}

export default Form;