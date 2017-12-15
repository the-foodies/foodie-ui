import React from 'react';
import { Media, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const FollowerEntry = props => (
  <Media onClick={
    () => {
      props.history.push({
        pathname: `/profile/${props.user.displayName}`,
        state: { id: props.user.id },
      });
    }}
  >
    <Row>
      <Col xs={4}>
        <Media.Left>
          <img
            className="comment-image"
            src={
              props.user.profileImageUrl ?
              props.user.profileImageUrl
              :
              'https://pbs.twimg.com/profile_images/588185534390005760/3D1mczNT.jpg'
            }
            alt="profile"
          />
        </Media.Left>
      </Col>
      <Col xs={8}>
        <Media.Body>
          <Media.Heading>{props.user.displayName}</Media.Heading>
        </Media.Body>
      </Col>
    </Row>
  </Media>
);

FollowerEntry.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(FollowerEntry);
