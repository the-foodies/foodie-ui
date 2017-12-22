import React from 'react';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CarouselInstance = props => (
  <Carousel>
    {props.picturesToDisplay.map(item => (
      <Carousel.Item key={item.name}>
        <img src={item.image_url} alt={item.name} />
        <Carousel.Caption>
          <p>{item.description}</p>
          <h3>{item.name}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

CarouselInstance.propTypes = {
  picturesToDisplay: PropTypes.array.isRequired,
};

export default CarouselInstance;
