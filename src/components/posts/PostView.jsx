import React from 'react';
import { Row, Col, PageHeader, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import PostEntry from './PostEntry';

const PostView = props => (
  <div>
    <Row>
      <Col xs={12} md={12}>
        <PageHeader>My Posts</PageHeader>
      </Col>
    </Row>
    <Row>
      <Col xs={12} md={12}>
        <ListGroup className="post-list">
          {props.posts.map((post, index) => (
            <PostEntry
              curUser={props.curUser}
              loadProfile={props.loadProfile}
              key={index}
              {...post}
            />
          ))}
        </ListGroup>
      </Col>
    </Row>
  </div>
);

PostView.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostView;
