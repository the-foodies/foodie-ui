import React from 'react';
import axios from 'axios';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Loading from '../displays/Loading';
import { changeRestToCarouselFormat } from '../../utils/detailsPage';
import TrendingCarousel from '../displays/TrendingCarousel';
import ListRecommendedItems from '../displays/ListRecommendedItems';
import HomeFilterThumbnails from './HomeFilterThumbnails';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      trendingRecipes: [],
      trendingRestaurants: [],
    };
    this.passTrendingItemsToState = this.passTrendingItemsToState.bind(this);
  }

  async componentDidMount() {
    // THIS WILL BE SWITCHED OUT WHEN HOOKED UP TO TRENDING WORKER
    // get 4 recipes from database
    const random1 = Math.floor(Math.random() * 3) + 1;
    const recipe1 = await this.props.dispatchApi.getRecipeById(random1);
    const random2 = Math.floor(Math.random() * 2) + 4;
    const recipe2 = await this.props.dispatchApi.getRecipeById(random2);
    const random3 = Math.floor(Math.random() * 2) + 6;
    const recipe3 = await this.props.dispatchApi.getRecipeById(random3);
    const random4 = Math.floor(Math.random() * 2) + 8;
    const recipe4 = await this.props.dispatchApi.getRecipeById(random4);
    const arr = [recipe1.data, recipe2.data, recipe3.data, recipe4.data];
    // get 4 recipes from database
    const restaurant1 = await this.props.dispatchApi.getRestaurantById(random1);
    const restaurant2 = await this.props.dispatchApi.getRestaurantById(random2);
    const restaurant3 = await this.props.dispatchApi.getRestaurantById(random3);
    const restaurant4 = await this.props.dispatchApi.getRestaurantById(random4);
    const arr2 = [restaurant1.data, restaurant2.data, restaurant3.data, restaurant4.data];
    this.passTrendingItemsToState(arr, arr2);
  }

  async passTrendingItemsToState(arrRecipes, arrRestaurants) {
    const trendingRestaurants = changeRestToCarouselFormat(arrRestaurants);
    const { data } = await axios.get(`${REST_URL}/trending`);
    console.log('helloooooooo', data)
    this.setState({
      trendingRestaurants,
      trendingRecipes: arrRecipes,
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <PageHeader>Trending GrubEZ <small>Put Trending Name Here ASAP</small></PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <TrendingCarousel picturesToDisplay={this.state.trendingRestaurants} />
          </Col>
          <Col xs={12}>
            {/*<ListRecommendedItems list={this.state.trendingRecipes} />*/}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <PageHeader>Filter Trending Below<br />
              <small>Trending Now</small>
            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <HomeFilterThumbnails />
          </Col>
        </Row>
      </Grid>
    );
  }
}

Home.propTypes = {
  dispatchApi: PropTypes.object.isRequired,
};

export default Home;
