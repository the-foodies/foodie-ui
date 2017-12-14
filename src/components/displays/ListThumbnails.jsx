import React from 'react';
import PropTypes from 'prop-types';
import { Col, Thumbnail, Button } from 'react-bootstrap';


const ListThumbnails = props => (
  <div>
    {props.list.map(thumbnail => (
      <Col sm={6} md={3} key={thumbnail.id} >
        <Thumbnail src={thumbnail.url} alt={thumbnail.name} rounded="true">
          <h3>{thumbnail.name}</h3>
          <p>{thumbnail.description}</p>
          <br />
          <Button bsStyle="primary">See User Profile</Button>&nbsp;
          <Button bsStyle="default">Make That Recipe</Button>
        </Thumbnail>
      </Col>
      ))}
  </div>
);

ListThumbnails.propTypes = {
  list: PropTypes.array.isRequired,
};

export default ListThumbnails;
