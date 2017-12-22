import React from 'react';
import axios from 'axios';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
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
      loading: null,
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
    if (this.state.trendingItems.length === 0) {
      this.setState({
        loading: true,
      });
    }
    const { data } = await axios.get(`${REST_URL}/trending`);
    const top = data.slice(0, 5);
    const seasonalItems = data.slice(5, 10);
    const filterTrending = changeAllToCarouselFormat(data);
    const trendingItems = changeAllToCarouselFormat(top);
    console.log('filter trending', filterTrending);
    console.log('trending Items', trendingItems);
    console.log('seasonal Items', seasonalItems);

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
      <div>
        <Grid>
          <Row className="homepage-title-section">
            <Col xs={8} xsOffset={2}>
              <PageHeader>FoodEZ</PageHeader>
              <h2>Pronounced 'foodies' - a page for the common food lover in us all</h2>
              <h3>- Brought to you by Max, Zac, and Adrian</h3>
            </Col>
          </Row>
        </Grid>
        <Grid className="details-dashed-border">
          <Row className="details-page">
            <Col xs={6} className="details-carousel">
              <h3>Top Trending Foods</h3>
              <TrendingCarousel id="home" picturesToDisplay={this.state.trendingItems} />
            </Col>
            <Col xs={6}>
              <h3>Seasonal Favorites Selected By Your Devs</h3>
              <ListRecommendedItems list={this.state.seasonalItems} />
            </Col>
          </Row>
        </Grid>
        <Grid className="details-dashed-border details-page">
          <h3>Filter Trending Links By Category</h3>
          <Row>
            <Col xs={10}>
              <HomeFilterThumbnails displayPictures={this.state.filterTrending} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
