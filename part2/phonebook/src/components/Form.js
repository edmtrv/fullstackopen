import React from 'react';

const Form = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onNewData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input onChange={props.onNameChange} value={props.name} />
      </div>
      <div>
        Number: <input onChange={props.onNumberChange} value={props.number} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default Form;
