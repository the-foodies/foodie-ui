import React from 'react';
import axios from 'axios';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TrendingCarousel from '../displays/TrendingCarousel';
import Loading from '../displays/Loading';
import ListRecommendedItems from '../displays/ListRecommendedItems';
import CookingQuotes from '../testData/cookingQuotes.json';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

class RecipeHomePage extends React.Component {
  constructor(props) {
    super(props);
    const cookingQuote = CookingQuotes[Math.floor(Math.random() * CookingQuotes.length)];
    this.state = {
      cookingQuote,
      loading: false,
      seasonalRecipes: [],
      trendingRecipes: [],
    };
    this.passRecipesToState = this.passRecipesToState.bind(this);
  }

  async componentDidMount() {
    const { data } = await axios.get(`${REST_URL}/trending/tags`, {
      params: {
        tag: ['winter', 'soup'],
        type: 'recipe',
      },
    });
    const trendingRecipes = await axios.get(`${REST_URL}/trending/recipes`).data;
    this.passRecipesToState(data, trendingRecipes);
  }

  async passRecipesToState(seasonalArr, trendingArr) {
    this.setState({
      trendingRecipes: trendingArr,
      seasonalRecipes: seasonalArr,
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
              <PageHeader>Welcome to Recipes</PageHeader>
              <h2>{this.state.cookingQuote.text}</h2>
              <h3>- {this.state.cookingQuote.author}</h3>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={6}>
              <h3>Seasonal Recommendations from the Staff</h3>
              {/*<ListRecommendedItems list={this.state.trendingRecipes} />*/}
            </Col>
            <Col xs={6}>
              <PageHeader>
                <small>Trending Recipes</small>
              </PageHeader>
              <TrendingCarousel picturesToDisplay={this.state.seasonalRecipes} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageHeader>Filter Recipe Results By Category<br />
                <small>See Below for Recipes or Submit Your Own</small>
              </PageHeader>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

RecipeHomePage.propTypes = {
};

export default RecipeHomePage;
