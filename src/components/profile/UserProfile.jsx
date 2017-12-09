import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Thumbnail, PageHeader } from 'react-bootstrap';
import PostView from '../posts/PostView';

const UserProfile = props => (
  <Grid>
    <Row>
      <Col xs={12} md={6}>
        <PageHeader>{props.displayName}{"'s"} Profile</PageHeader>
        <Thumbnail src={props.image} alt="242x200">
          <h3>10000 Followers</h3>
          <p>Name: {props.firstName} {props.lastName}</p>
          <p>Email: {props.email}</p>
        </Thumbnail>
      </Col>
      <Col xs={12} md={4}>
        <PostView posts={props.posts} />
      </Col>
    </Row>
  </Grid>
);

UserProfile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserProfile;
