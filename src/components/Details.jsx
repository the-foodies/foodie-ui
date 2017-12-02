import React from 'react';
import PropTypes from 'prop-types';

const Details = props => (
  <div>
    <div>{props.name}</div>
    <div>{props.instructions}</div>
    <div>{props.ingredients}</div>
  </div>
);
Details.propTypes = {
  name: PropTypes.string.isRequired,
  instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Details;
