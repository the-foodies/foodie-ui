import React from 'react';
import axios from 'axios';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import TrendingCarousel from '../displays/TrendingCarousel';
import Loading from '../displays/Loading';
import { changeRecipeToCarouselFormat } from '../../utils/detailsPage';
import ListRecommendedItems from '../displays/ListRecommendedItems';
import ListThumbnails from '../displays/ListThumbnails';
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
    const seasonalRecipes = await axios.get(`${REST_URL}/trending/tags`, {
      params: {
        tag: ['winter', 'soup'],
        type: 'recipe',
      },
    });
    const trendingRecipes = await axios.get(`${REST_URL}/trending/recipes`);
    if (trendingRecipes.data.length > 8) {
      trendingRecipes.data = trendingRecipes.data.slice(0, 8);
    }
    if (seasonalRecipes.data.length > 5) {
      seasonalRecipes.data = seasonalRecipes.data.slice(0, 5);
    }
    this.passRecipesToState(seasonalRecipes.data, trendingRecipes.data);
  }

  async passRecipesToState(seasonalRecipes, trendingArr) {
    const trendingRecipes = changeRecipeToCarouselFormat(trendingArr);
    this.setState({
      trendingRecipes,
      seasonalRecipes,
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
        <Grid className="details-dashed-border">
          <Row className="details-page">
            <Col xs={6}>
              <h3>Seasonal Recommendations from the Staff</h3>
              <ListRecommendedItems list={this.state.seasonalRecipes} />
            </Col>
            <Col xs={6} className="details-carousel">
              <h3>Trending Recipes</h3>
              <TrendingCarousel picturesToDisplay={this.state.trendingRecipes} />
            </Col>
          </Row>
        </Grid>
        <Grid className="details-dashed-border">
          <ListThumbnails list={this.state.trendingRecipes} type="recipe" />
        </Grid>
        <Grid>
          <Row>
            <Col xs={6} xsOffset={3}>
              <Button
                bsStyle="info"
                bsSize="large"
                block
                href="/recipe-submission"
              >Click To Submit Your Own Recipe
              </Button>
            </Col>
          </Row>
        </Grid>
        <br /><br /><p />
      </div>
    );
  }
}

export default RecipeHomePage;
