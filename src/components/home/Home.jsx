import React from 'react';
import axios from 'axios';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Loading from '../displays/Loading';
import { changeAllToCarouselFormat } from '../../utils/detailsPage';
import TrendingCarousel from '../displays/TrendingCarousel';
import ListRecommendedItems from '../displays/ListRecommendedItems';
import HomeFilterThumbnails from './HomeFilterThumbnails';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      trendingItems: [],
      seasonalItems: [],
      filterTrending: [],
    };
    this.passTrendingItemsToState = this.passTrendingItemsToState.bind(this);
  }

  async componentDidMount() {
    this.passTrendingItemsToState();
  }

  async passTrendingItemsToState() {
    const { data } = await axios.get(`${REST_URL}/trending`);
    const top = data.slice(0, 5);
    const seasonalItems = data.slice(5, 10);
    const filterTrending = changeAllToCarouselFormat(data);
    const trendingItems = changeAllToCarouselFormat(top);
    console.log('helloooooooo', trendingItems);
    this.setState({
      filterTrending,
      trendingItems,
      seasonalItems,
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
          <Col xs={8}>
            <PageHeader>Trending GrubEZ</PageHeader>
            <TrendingCarousel picturesToDisplay={this.state.trendingItems} />
          </Col>
          <Col xs={4}>
            <ListRecommendedItems list={this.state.seasonalItems} />
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
            <HomeFilterThumbnails
              displayPictures={this.state.filterTrending}
            />
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
