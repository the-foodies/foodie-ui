import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Thumbnail, Button } from 'react-bootstrap';


const ListThumbnails = props => (
  <div>
    {props.list.map(thumbnail => (
      <Col xs={3} key={thumbnail.name} >
        <Thumbnail
          className="trending-list-thumbnails"
          src={thumbnail.image_url}
          alt={thumbnail.name}
          rounded="true"
          onClick={
            () => {
              props.history.push({
                pathname: `/${props.type}/${thumbnail.name}/${thumbnail.id}`,
              });
            }}
        >
          <h5>{thumbnail.name}</h5>
          <p>{thumbnail.description}</p>
          <Button id="trending-button" bsStyle="info">Make It!</Button>
        </Thumbnail>
      </Col>
      ))}
  </div>
);

ListThumbnails.propTypes = {
  list: PropTypes.array.isRequired,
};

export default withRouter(ListThumbnails);
