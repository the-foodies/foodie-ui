import React from 'react';
import axios from 'axios';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import TrendingCarousel from '../displays/TrendingCarousel';
import Loading from '../displays/Loading';
import { changeRestToCarouselFormat } from '../../utils/detailsPage';
import ListRecommendedItems from '../displays/ListRecommendedItems';
import ListThumbnails from '../displays/ListThumbnails';
import DiningQuotes from '../testData/diningQuotes.json';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

class RestaurantHomePage extends React.Component {
  constructor(props) {
    super(props);
    const diningQuote = DiningQuotes[Math.floor(Math.random() * DiningQuotes.length)];
    this.state = {
      diningQuote,
      loading: false,
      seasonalRestaurants: [],
      trendingRestaurants: [],
    };
    this.passRestaurantsToState = this.passRestaurantsToState.bind(this);
  }

  async componentDidMount() {
    const seasonalRestaurants = await axios.get(`${REST_URL}/trending/tags`, {
      params: {
        tag: ['item3'],
        type: 'restaurant',
      },
    });
    const trendingRestaurants = await axios.get(`${REST_URL}/trending/restaurants`);
    if (trendingRestaurants.data.length > 8) {
      trendingRestaurants.data = trendingRestaurants.data.slice(0, 8);
    }
    if (seasonalRestaurants.data.length > 5) {
      seasonalRestaurants.data = seasonalRestaurants.data.slice(0, 5);
    }
    this.passRestaurantsToState(seasonalRestaurants.data, trendingRestaurants.data);
  }

  passRestaurantsToState(seasonalRestaurants, trendingArr) {
    const trendingRestaurants = changeRestToCarouselFormat(trendingArr);
    this.setState({
      trendingRestaurants,
      seasonalRestaurants,
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <div>
        <Grid>
          <Row className="homepage-title-section">
            <Col xs={8} xsOffset={2}>
              <PageHeader>Welcome to Restaurants</PageHeader>
              <h2>{this.state.diningQuote.text}</h2>
              <h3>- {this.state.diningQuote.author}</h3>
            </Col>
          </Row>
        </Grid>
        <Grid className="details-dashed-border">
          <Row className="details-page">
            <Col xs={6}>
              <h3>Seasonal Restaurants the Staff Loves</h3>
              <ListRecommendedItems list={this.state.seasonalRestaurants} />
            </Col>
            <Col xs={6} className="details-carousel">
              <h3>Trending Restaurants</h3>
              <TrendingCarousel picturesToDisplay={this.state.trendingRestaurants} />
            </Col>
          </Row>
        </Grid>
        <Grid className="details-dashed-border details-page">
          <h3>Trending Restaurant Links</h3>
          <ListThumbnails list={this.state.trendingRestaurants} type="restaurant" />
        </Grid>
        <Grid>
          <Row>
            <Col xs={6} xsOffset={3}>
              <Button
                bsStyle="info"
                bsSize="large"
                block
                href="/restaurant-submission"
              >Click To Submit Your Own Restaurant Review
              </Button>
            </Col>
          </Row>
        </Grid>
        <br /><br /><p />
      </div>
    );
  }
}

export default RestaurantHomePage;
