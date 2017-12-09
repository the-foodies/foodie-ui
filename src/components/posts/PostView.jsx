import React from 'react';
import { Grid, Row, Col, ListGroup, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';

import PostEntry from './PostEntry';

const PostView = props => (
  <Grid>
    <Row>
      <Col xs={12} md={6}>
        <PageHeader>My Posts</PageHeader>
      </Col>
    </Row>
    <Row>
      <Col xs={6} md={6}>
        <ListGroup className="post-list">
          {props.posts.map((post) => {
            let str = '';
            let image = '';
            const index = 0;
            if (post.name) {
              str = post.name;
            } else {
              str = post.title;
            }
            if (post.ImagesRecipes) {
              image = post.ImagesRecipes[index];
            } else {
              image = post.ImagesRestaurants[index];
            }
            return (<PostEntry name={str} image={image} key={str} />);
          })}
        </ListGroup>
      </Col>
    </Row>
  </Grid>
);

PostView.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostView;
