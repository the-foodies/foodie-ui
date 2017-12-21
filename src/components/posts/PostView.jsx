import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import PostEntry from './PostEntry';

const PostView = props => (
  <div>
    <Row>
      <Col xs={12} md={12}>
        <ListGroup className="post-list">
          {props.posts.map((post, index) => (
            <PostEntry
              owner={props.owner}
              refreshPage={props.refreshPage}
              refreshParam={props.refreshParam}
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
  owner: PropTypes.object.isRequired,
  refreshPage: PropTypes.func.isRequired,
  refreshParam: PropTypes.string.isRequired,
};

export default PostView;
