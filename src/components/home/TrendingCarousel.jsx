import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselInstance = (props) => {
  return (
    <Carousel>
      {
        props.picturesToDisplay.map((item) => {
          return (
            <Carousel.Item key={item.id}>
              <img src={item.url} alt={item.title} />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })
      }
    </Carousel>
  );
};

export default CarouselInstance;
