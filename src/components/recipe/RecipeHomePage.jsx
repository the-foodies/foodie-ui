import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TrendingCarousel from '../displays/TrendingCarousel';
import Loading from '../displays/Loading';
import { changeRecipeToCarouselFormat } from '../../utils/detailsPage';
import ListRecommendedItems from '../displays/ListRecommendedItems';
import CookingQuotes from '../testData/cookingQuotes.json';

class RecipeHomePage extends React.Component {
  constructor(props) {
    super(props);
    const cookingQuote = CookingQuotes[Math.floor(Math.random() * CookingQuotes.length)];
    this.state = {
      cookingQuote,
      loading: false,
      displayRecipes: [],
      trendingRecipes: [],
    };
    this.passSeasonalItemsToState = this.passSeasonalItemsToState.bind(this);
  }

  async componentDidMount() {
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
    this.passSeasonalItemsToState(arr);
  }

  passSeasonalItemsToState(array) {
    const displayRecipes = changeRecipeToCarouselFormat(array);
    this.setState({
      trendingRecipes: array,
      displayRecipes,
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
          <Row>
            <Col xs={8} xsOffset={2}>
              <PageHeader>Welcome to Recipes <br />
                <small>{this.state.cookingQuote.text}</small><br />
                <small>- {this.state.cookingQuote.author}</small>
              </PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <ListRecommendedItems list={this.state.trendingRecipes} />
            </Col>
            <Col xs={6}>
              <PageHeader>
                <small>Trending Recipes</small>
              </PageHeader>
              <TrendingCarousel picturesToDisplay={this.state.displayRecipes} />
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
  dispatchApi: PropTypes.object.isRequired,
};

export default RecipeHomePage;
