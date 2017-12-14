import React from 'react';
import { Media, ListGroupItem, Label, Col, Row, FormControl, FormGroup, InputGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import PostComment from './PostComment';


const PostEntry = (props) => {
  console.log(props);

  const image = props.ImagesRecipes ? props.ImagesRecipes : props.ImagesRestaurants;

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
            <Media.Left>
              <img className="post-image" src={image[0].image_url} alt="242x200" />
            </Media.Left>
          </Col>
          <Col xs={12} md={8}>
            <Media.Body>
              <Media.Heading>{props.name}</Media.Heading>
              <p>{image[0].description}</p>
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
        {props.Comments.map(comment => <PostComment key={comment.id} {...comment} />)}
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              defaultValue="Add a comment..."
            />
            <InputGroup.Button>
              <Button>Comment</Button>
            </InputGroup.Button>
          </InputGroup>

        </FormGroup>
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

export default PostEntry;
