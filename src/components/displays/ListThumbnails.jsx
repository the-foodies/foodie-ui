import React from 'react';
import PropTypes from 'prop-types';
import { Col, Thumbnail, Button, ButtonGroup } from 'react-bootstrap';


const ListThumbnails = props => (
  <div>
    {props.list.map(thumbnail => (
      <Col sm={6} md={3} key={thumbnail.name} >
        <Thumbnail className="list" src={thumbnail.url} alt={thumbnail.name} rounded="true">
          <h3>{thumbnail.name}</h3>
          <p>{thumbnail.description}</p>
          <ButtonGroup>
            <Button bsStyle="default">Profile</Button>
            <Button bsStyle="primary">Make It!</Button>
          </ButtonGroup>
        </Thumbnail>
      </Col>
      ))}
  </div>
);

ListThumbnails.propTypes = {
  list: PropTypes.array.isRequired,
};

export default ListThumbnails;
