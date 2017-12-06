import React from 'react';
import { Col, Thumbnail, Button } from 'react-bootstrap';

const SeasonalItems = ({ list }) => {
  return (
    <div>
      {list.map((thumbnail) => {
        return (
          <Col sm={6} md={3} key={thumbnail.id} >
            <Thumbnail src={thumbnail.url} alt={thumbnail.name} rounded="true">
              <h3>{thumbnail.name}</h3>
              <p>{thumbnail.description}</p>
              <br />
              <Button bsStyle="primary">See User Profile</Button>&nbsp;
              <Button bsStyle="default">Make That Recipe</Button>
            </Thumbnail>
          </Col>
        );
      })}
    </div>
  );
};

export default SeasonalItems;
