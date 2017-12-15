import React from 'react';
import { Grid, Row, Col, PageHeader, Label } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { mapDetailsToCarouselFormat } from '../../utils/detailsPage';
import TrendingCarousel from '../displays/TrendingCarousel';
import RecipeFilterInstructions from './RecipeFilterInstructions';
import HorizontalScrollBar from '../displays/HorizontalScrollBar';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

class RecipeDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    const { curRecipe } = props.app;
    const {
      name,
      sodium,
      protein,
      rating,
      calories,
      fat,
      difficulty,
      portions,
      recipeHistory,
    } = curRecipe;
    const information = [
      {
        name: 'Sodium',
        value: sodium,
      },
      {
        name: 'Protein',
        value: protein,
      },
      {
        name: 'Rating',
        value: rating,
      },
      {
        name: 'Calories',
        value: calories,
      },
      {
        name: 'Fat',
        value: fat,
      },
    ];
    const images = mapDetailsToCarouselFormat({
      name: curRecipe.name,
      description: curRecipe.name,
      images: curRecipe.ImagesRecipes,
    });
    this.state = {
      directions: curRecipe.Directions,
      ingredients: curRecipe.Ingredients,
      loading: true,
      difficulty,
      images,
      information,
      name,
      portions,
      recipeHistory,
      similarRecipes: [{
        id: 1, name: 'Test Recipe', image_url: 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto,fl_lossy/wp-cms/uploads/2017/06/i-1-sonic-burger.jpg', linkUrl: '/',
      },
      {
        id: 2, name: 'Test 2', image_url: 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto,fl_lossy/wp-cms/uploads/2017/06/i-1-sonic-burger.jpg', linkUrl: '/',
      },
      {
        id: 3, name: 'Test 3', image_url: 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto,fl_lossy/wp-cms/uploads/2017/06/i-1-sonic-burger.jpg', linkUrl: '/',
      },
      {
        id: 4, name: 'Test 4', image_url: 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto,fl_lossy/wp-cms/uploads/2017/06/i-1-sonic-burger.jpg', linkUrl: '/',
      },
      ],
    };
  }

  componentDidMount() {
    console.log('suppppppppp');
    console.log(this.props);
    this.loadRecipeDetail('2');
  }

  loadRecipeDetail(recipeId) {
    this.props.dispatchApi.getRecipeById(recipeId)
      .then(({ data }) => {
        console.log('-----------------');
        console.log(data);
        console.log('+++++++++++++++');
        console.log(this.props);
        this.setState({
          recipeHistory: 'We got it yo',
          loading: false,
        });
      });
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <div>
        <Grid id="recipe-details-info">
          <Row>
            <Col xs={8} xsOffset={2}>
              <TrendingCarousel picturesToDisplay={this.state.images} />
            </Col>
          </Row>
          <Row>
            <Col xs={6} xsOffset={3}>
              <PageHeader>{this.state.name}</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={3} xsOffset={1}>
              <PageHeader>Nutritional Info</PageHeader>
              {this.state.information.map(item =>
                (<h3 key={item.name}>{item.name}: <Label bsStyle="info">{item.value}</Label></h3>))}
            </Col>
            <Col xs={3} xsOffset={1}>
              <PageHeader>Difficulty</PageHeader>
              <h3>Chef Level: <Label bsStyle={this.state.difficulty === 'Easy' ? 'info' : 'warning'}>{this.state.difficulty}</Label>
              </h3>
            </Col>
            <Col xs={3} xsOffset={1}>
              <PageHeader>Portions</PageHeader>
              <h3>Portions: <Label bsStyle="info">{this.state.portions}</Label></h3>
            </Col>
          </Row>
        </Grid>
        <PageHeader>Recipe History</PageHeader>
        <Grid id="recipe-details-history">
          <Row>
            <Col xs={10} xsOffset={1}>
              <h4>{this.state.recipeHistory}</h4>
            </Col>
          </Row>
        </Grid>
        <Grid className="recipe-details">
          <Row>
            <Col xs={10} xsOffset={1}>
              <RecipeFilterInstructions
                directions={this.state.directions}
                ingredients={this.state.ingredients}
              />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={12}>
              <HorizontalScrollBar
                picturesToDisplay={this.state.similarRecipes}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

RecipeDetailsPage.propTypes = {
  app: PropTypes.object.isRequired,
  dispatchApi: PropTypes.object.isRequired,
};

export default RecipeDetailsPage;
