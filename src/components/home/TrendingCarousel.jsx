import React from 'react';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CarouselInstance = props => (
  <Carousel>
    {props.picturesToDisplay.map(item => (
      <Carousel.Item key={item.id}>
        <img src={item.image_url} alt={item.name} />
        <Carousel.Caption>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

CarouselInstance.propTypes = {
  picturesToDisplay: PropTypes.array.isRequired,
};

export default CarouselInstance;
