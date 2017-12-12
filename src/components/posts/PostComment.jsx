import React from 'react';
import { Media, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PostComment = ({ User, text }) => (
  <Media>
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
          <Media.Heading>DisplayName</Media.Heading>
          <p>{text}</p>
        </Media.Body>
      </Col>
    </Row>
  </Media>
);

PostComment.propTypes = {
  text: PropTypes.string.isRequired,
  User: PropTypes.object.isRequired,
};

export default PostComment;
