import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Media, PageHeader } from 'react-bootstrap';

const SeasonalItems = props => (
  <div>
    <PageHeader>
      <small>Seasonal Items</small>
    </PageHeader>
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
          <p>{item.Comments[0].text}</p>
        </Media.Body>
      </Media>
      ))}
  </div>
);

SeasonalItems.propTypes = {
  list: PropTypes.array.isRequired,
};


export default withRouter(SeasonalItems);
