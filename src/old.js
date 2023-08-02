import React, { useState } from 'react';

/* Class code had export default function form() but i wsa getting an error so i took default out*/
export function Form(){



  /* name holds user input and lastName handles output from server
  these values are maintained as stateful with setter methods to keep them updated
  */
 const[name, setName] = useState('');
 const[lastName, setLastName] = useState('');

 /* Error is the boolean value we use as a flag to display either an error or success response

 Submitted is the boolean value that we use to indicate if the input was valid.
 It only works for empty string responses for now
 
 These are also stateful values with setter methods

 */

 const[submitted, setSubmitted] = useState(false);
 const [error, setError] = useState(false);

 /* This method handles the change of input
 */

 const handleName = (e) => {
  setName(e.target.value);
  setSubmitted(false);
 };

 /* This method triggers on submit. It calls the backend endpoint to get last name
 The backend only accepts one input in any other case it returns a 404 with a custom error

 in case of a 200 we set seterror as false
 
 */

 const handleSubmit = (e) => {
  e.preventDefault();
  if (name === ''){
    setError(true);
  } else {
    setSubmitted(true);
    var fetchURL="/getLastName" + name
    fetch(fetchURL)

    .then((response) => response.text())
    // .then(dataa => console.log(data))
    .then(function(data){
      data=JSON.parse(data);

      if(data.code===200){
        setLastName(data.name)
        setError(false);
      }
      else {
        setError(true);
        setLastName("response code: " + data.code + " and message received " + data.error)
      }
    });
  }
 }
};

/* We use this method when we get aa 200 response */

const successMessage = () => {
  return (
    <>
      <div
        className="success"
        style={{
          display: submitted ? 'block' : 'none',
        }}
      >
        <p >Response from backend: "{lastname}"</p>
      </div>
    </>
  );
};

/* We use this for 404 error */

const errorMessage = () => {
  return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}
      >
        <p >Please enter a valid first name</p>
      </div>
  );
}

return (
  <div className="form">
    <div>
      <h3>Enter First Name</h3>
    </div>

    <form>
      {}
      <label id="lbl" className="label">First Name: </label>
      <input id="inp" onChange={handleName} className="input"
      value={name} type="text" />
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


export default Form;