import React from 'react';
import { Media, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const PostComment = ({ User, text, history }) => (
  <Media onClick={
    () => {
      history.push({
        pathname: `/profile/${User.displayName}`,
        state: { id: User.id },
      });
    }}
  >
    <Row>
      <Col xs={2}>
        <Media.Left>
          <img
            className="comment-image"
            src={
              User.profileImageUrl ?
              User.profileImageUrl
              :
              'https://pbs.twimg.com/profile_images/588185534390005760/3D1mczNT.jpg'
            }
            alt="profile"
          />
        </Media.Left>
      </Col>
      <Col xs={10}>
        <Media.Body>
          <Media.Heading>{User.displayName}</Media.Heading>
          <p>{text}</p>
        </Media.Body>
      </Col>
    </Row>
  </Media>
);

PostComment.propTypes = {
  text: PropTypes.string.isRequired,
  User: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(PostComment);
