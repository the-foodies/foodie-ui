import React from 'react';
import { Media, ListGroupItem, Label, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Comment from '../displays/Comment';
import AddComment from '../displays/AddComment';


const PostEntry = (props) => {
  const image = props.ImagesRecipes || props.ImagesRestaurants;
  const type = props.ImagesRecipes ? 'recipe' : 'restaurant';
  const handleDetailClick = () => {
    props.history.push({ 
      pathname: `/${type}/${props.name}/${props.id}`,
    });
  };

  const ifHasFoodItems = () => {
    if (props.FoodItems) {
      return props.FoodItems.map(foodItem => (
        <Media key={foodItem.id}>
          <Media.Body>
            <Media.Heading>{foodItem.name}</Media.Heading>
            <p>{foodItem.rating}</p>
            <p>{foodItem.description}</p>
          </Media.Body>
        </Media>
      ));
    }
    return null;
  };

  return (
    <ListGroupItem>
      <Media>
        <Row>
          <Col xs={10} xsOffset={1} mdOffset={0} md={4}>
            <Media.Left onClick={handleDetailClick}>
              <img className="post-image" src={image[0].image_url} alt="242x200" />
            </Media.Left>
          </Col>
          <Col xs={12} md={8}>
            <Media.Body>
              <Media.Heading>{props.name}</Media.Heading>
              <p>We gonna need some post data here yo</p>
            </Media.Body>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {ifHasFoodItems()}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {(
              <h5>
                {props.Tags.map(tag => (
                  <span className="tag-list" key={tag.id}>
                    <Label bsStyle="info">#{tag.name}</Label>
                    {' '}
                  </span>
                  ))
                }
              </h5>
            )}
          </Col>
        </Row>
        <hr />
        {props.Comments.map(comment => <Comment key={comment.id} {...comment} />)}
        <hr />
        <AddComment {...props} />
      </Media>
    </ListGroupItem>
  );
};

const imageExists = (props, propName, componentName) => {
  if (!props.ImagesRecipes && !props.ImagesRestaurants) {
    return new Error(`One of props image 'recipe' or 'restaurant' was not specified in '${componentName}'.`);
  }
  return null;
};

PostEntry.propTypes = {
  name: PropTypes.string.isRequired,
  ImagesRecipes: imageExists,
  ImagesRestaurants: imageExists,
  FoodItems: PropTypes.arrayOf(PropTypes.object),
  Tags: PropTypes.arrayOf(PropTypes.object),
  Comments: PropTypes.arrayOf(PropTypes.object),

};

export default withRouter(PostEntry);
