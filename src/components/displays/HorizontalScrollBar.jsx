import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const HorizontalScrollBar = props => (
  <div>
  {console.log('--------')}
  {console.log(props)}
    <Grid>
      <h3>POSSIBLE RECIPES OF INTEREST</h3><hr />
      <Row>
        {props.picturesToDisplay.map(item => (
          <Col xs={3} key={item.id}>
            <Thumbnail
              src={item.ImagesRecipes[0].image_url}
              alt={item.name}
              onClick={
                () => {
                  console.log(item)
                  props.history.push({
                    pathname: `/recipe/${item.name}/${item.id}`,
                  });
                }}
            >
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p>
                <Button
                  bsStyle="primary"
                >
                  Click Here to See
                </Button>&nbsp;
              </p>
            </Thumbnail>
          </Col>
        ))}
      </Row>
    </Grid>
  </div>
);
/*
{props.list.map(item => (
  <Media
    key={item.id}
    onClick={
      () => {
        const type = item.ImagesRecipes ? 'recipe' : 'restaurant';
        props.history.push({
          pathname: `/${type}/${item.name}/${item.id}`,
        });
      }}
  >
    <Media.Left align="top">
      <img
        width={64}
        height={64}
        src={item.ImagesRecipes ? item.ImagesRecipes[0].image_url : item.ImagesRestaurants[0].image_url }
        alt={item.name}
      />
    </Media.Left>
    <Media.Body>
      <Media.Heading>{item.name}</Media.Heading>
      <p>testing testing</p>
    </Media.Body>
  </Media>
  ))}

  {onClick={
    () => {
      props.history.push({
        pathname: `/recipe/${item.name}/${item.id}`,
      });
    }}}
*/
HorizontalScrollBar.propTypes = {
  picturesToDisplay: PropTypes.array.isRequired,
};

export default withRouter(HorizontalScrollBar);
