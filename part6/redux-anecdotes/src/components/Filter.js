import React from 'react';
import { connect } from 'react-redux';
import { filterResults } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    const text = event.target.value;
    props.filterResults(text);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input type="text" onChange={handleChange} />
    </div>
  );
};

export default connect(null, { filterResults })(Filter);
