import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TrendingCarousel from '../displays/TrendingCarousel';
import Loading from '../displays/Loading';
import { changeRestToCarouselFormat } from '../../utils/detailsPage';
import ListRecommendedItems from '../displays/ListRecommendedItems';
import DiningQuotes from '../testData/diningQuotes.json';

class RestaurantHomePage extends React.Component {
  constructor(props) {
    super(props);
    const diningQuote = DiningQuotes[Math.floor(Math.random() * DiningQuotes.length)];
    this.state = {
      diningQuote,
      loading: false,
      displayRestaurants: [],
      trendingRestaurants: [],
    };
    this.passSeasonalItemsToState = this.passSeasonalItemsToState.bind(this);
  }

  async componentDidMount() {
    // get 4 recipes from database
    const random1 = Math.floor(Math.random() * 3) + 1;
    const restaurant1 = await this.props.dispatchApi.getRestaurantById(random1);
    const random2 = Math.floor(Math.random() * 2) + 4;
    const restaurant2 = await this.props.dispatchApi.getRestaurantById(random2);
    const random3 = Math.floor(Math.random() * 2) + 6;
    const restaurant3 = await this.props.dispatchApi.getRestaurantById(random3);
    const random4 = Math.floor(Math.random() * 2) + 8;
    const restaurant4 = await this.props.dispatchApi.getRestaurantById(random4);
    const arr = [restaurant1.data, restaurant2.data, restaurant3.data, restaurant4.data];
    this.passSeasonalItemsToState(arr);
  }

  passSeasonalItemsToState(array) {
    const displayRestaurants = changeRestToCarouselFormat(array);
    this.setState({
      trendingRestaurants: array,
      displayRestaurants,
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
          <Row>
            <Col xs={6}>
              <ListRecommendedItems list={this.state.trendingRestaurants} />
            </Col>
            <Col xs={6}>
              <PageHeader>
                <small>Trending Restaurants</small>
              </PageHeader>
              <TrendingCarousel picturesToDisplay={this.state.displayRestaurants} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageHeader>Filter Restaurant Results By Category<br />
                <small>See Below for Restaurants or Submit Your Own</small>
              </PageHeader>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

RestaurantHomePage.propTypes = {
  dispatchApi: PropTypes.object.isRequired,
};

export default RestaurantHomePage;
