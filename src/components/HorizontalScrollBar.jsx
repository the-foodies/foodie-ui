import React from 'react';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const HorizontalScrollBar = props => (
  <div>
    <Grid>
      <Row>
        {props.picturesToDisplay.map(pic => (
          <Col xs={3} key={pic.name}>
            <Thumbnail src={pic.imageUrl} alt={pic.name}>
              <h3>{pic.name}</h3>
              <p>{pic.id}</p>
              <p>
                <Button bsStyle="primary" href={pic.linkUrl}>
                  Button to Homepage
                </Button>&nbsp;
              </p>
            </Thumbnail>
          </Col>
        ))}
      </Row>
    </Grid>
  </div>
);

HorizontalScrollBar.propTypes = {
  picturesToDisplay: PropTypes.array.isRequired,
};


export default HorizontalScrollBar;
