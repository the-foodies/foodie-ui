import React from 'react';
import { Grid, Row, Col, PageHeader, Label } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TrendingCarousel from './home/TrendingCarousel';
import NavFilterDetails from './NavFilterDetails';
import HorizontalScrollBar from './HorizontalScrollBar';
import { mapDetailsToCarouselFormat, mapDetailsToHorizontalFormat } from '../utils/detailsPage';

class RestaurantDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('heyyyyyyyyyy');
    console.log(props);
    const images = mapDetailsToCarouselFormat({
      name: props.name,
      images: props.images,
    });
    const foodItems = mapDetailsToHorizontalFormat({
      name: props.name,
      foodItems: props.foodItems,
      image_url: props.images[0].image_url,
    });
    this.state = { images, foodItems };
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
              <TrendingCarousel picturesToDisplay={this.state.images} />
            </Col>
          </Row>
        </Grid>
        <PageHeader>Common Dishes from {this.props.name}</PageHeader>
        <Grid id="restaurant-food-items">
          <Row>
            <Col xs={12}>
              <HorizontalScrollBar
                picturesToDisplay={this.state.foodItems}
              />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1}>
              {this.props.tags.map(tag => (
                <Col xs={2} key={tag.id}>
                  <h5>{tag.name}<hr /></h5>
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
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  foodItems: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
};

export default RestaurantDetailsPage;
