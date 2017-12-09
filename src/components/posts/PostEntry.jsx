import React from 'react';
import { Thumbnail, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PostEntry = props => (
  <ListGroupItem>
    <Thumbnail src={props.image} alt="242x200">
      <h3>{props.name}</h3>
      <p>Description</p>
    </Thumbnail>
  </ListGroupItem>
);

PostEntry.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default PostEntry;
