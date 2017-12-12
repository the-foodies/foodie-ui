import React from 'react';
import { Grid, Row, Col, PageHeader, Label } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TrendingCarousel from './home/TrendingCarousel';
import NavFilterDetails from './NavFilterDetails';
import HorizontalScrollBar from './HorizontalScrollBar';

class RestaurantDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render() {
    return (
      <div>
        <Grid id="restaurant-details-info">
          <Row>
            <Col xs={6} xsOffset={3}>
              <PageHeader>{this.props.name}</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <PageHeader>Info</PageHeader>
              <h3>Address: <Label bsStyle="info">{this.props.address}</Label></h3>
              <h3>Website: <Label bsStyle="info">{this.props.website}</Label></h3>
            </Col>
            <Col xs={8}>
              <TrendingCarousel picturesToDisplay={this.props.images} />
            </Col>
          </Row>
        </Grid>
        <PageHeader>Common Dishes from {this.props.name}</PageHeader>
        <Grid id="restaurant-food-items">
          <Row>
            <Col xs={12}>
              <HorizontalScrollBar
                picturesToDisplay={this.props.foodItems}
              />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1}>
              {this.props.tags.map(tag => (
                <Col xs={2}>
                  <h5 key={tag.id}>{tag.name}<hr /></h5>
                </Col>
              ))}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

RestaurantDetailsPage.propTypes = {
};

export default RestaurantDetailsPage;
