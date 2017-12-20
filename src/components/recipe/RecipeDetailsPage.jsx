import React from 'react';
import { Grid, Row, Col, PageHeader, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { mapDetailsToCarouselFormat } from '../../utils/detailsPage';
import TrendingCarousel from '../displays/TrendingCarousel';
import RecipeFilterInstructions from './RecipeFilterInstructions';
import TrendingRecipesList from '../displays/TrendingRecipesList';
import Loading from '../displays/Loading';
import Comment from '../displays/Comment';
import AddComment from '../displays/AddComment';
import Tags from '../displays/Tags';

class RecipeDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // recipe: {},
      difficulty: '',
      name: '',
      portions: '',
      rating: '',
      recipeHistory: '',
      comments: [],
      directions: [],
      images: [],
      information: [],
      informationKeys: [],
      ingredients: [],
      tags: [],
      loading: true,
      similarRecipes: [],
    };
    this.loadRecipeDetail = this.loadRecipeDetail.bind(this);
    this.loadRelatedRecipes = this.loadRelatedRecipes.bind(this);
  }

  componentDidMount() {
    const id = this.props.id.toString() || '1';
    this.loadRecipeDetail(id);
    this.loadRelatedRecipes(['1', '2', '3', '4']);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ loading: true });
      this.loadRecipeDetail(nextProps.id);
    }
  }

  async loadRecipeDetail(recipeId) {
    const { data } = await this.props.dispatchApi.getRecipeById(recipeId);
    const images = mapDetailsToCarouselFormat({
      name: data.name,
      description: data.name,
      images: data.ImagesRecipes,
    });
    const {
      calories, fat, protein, sodium, name, rating,
    } = data;
    const info = {
      Calories: calories,
      Fat: fat,
      Protein: protein,
      Sodium: sodium,
    };
    const informationKeys = Object.keys(info);
    const information = Object.values(info);
    const difficulty = data.difficulty || 'Easy';
    const recipeHistory = data.recipeHistory || 'No history';
    const portions = data.portions || '5';
    const comments = data.Comments;
    const directions = data.Directions;
    const ingredients = data.Ingredients;
    const tags = data.Tags;
    await this.setState({
      difficulty,
      name,
      comments,
      portions,
      rating,
      recipeHistory,
      directions,
      images,
      information,
      informationKeys,
      ingredients,
      tags,
      loading: false,
    });
  }

  async loadRelatedRecipes(recipeIds) {
    let data;
    for (let ii = 1; ii <= recipeIds.length; ii++) {
      data = await this.props.dispatchApi.getRecipeById(String(ii));
      this.setState({
        similarRecipes: this.state.similarRecipes.concat([data.data]),
      });
    }
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <div>
        <Grid id="recipe-title-section">
          <Row>
            <Col xs={6} xsOffset={3}>
              <PageHeader>{this.state.name}</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={8} xsOffset={2}>
              <TrendingCarousel picturesToDisplay={this.state.images} />
            </Col>
          </Row>
        </Grid>
        <Grid id="recipe-details">
          <Row>
            <Col xs={3} xsOffset={1}>
              <h2>Nutritional Info</h2><hr />
              {this.state.informationKeys.map((item, index) =>
                (<h3 key={item}>{item}: <Label bsStyle="info">{this.state.information[index]}</Label></h3>))}
            </Col>
            <Col xs={3} xsOffset={1}>
              <h2>Ratings</h2><hr />
              <h3>Difficulty: <Label bsStyle={this.state.difficulty === 'Easy' ? 'info' : 'warning'}>{this.state.difficulty}</Label>
              </h3>
              <h3>Rating: <Label bsStyle="info">{this.state.rating}</Label>
              </h3>
            </Col>
            <Col xs={3} xsOffset={1}>
              <h2>Portions</h2><hr />
              <h3>Portions: <Label bsStyle="info">{this.state.portions}</Label></h3>
            </Col>
          </Row>
        </Grid>
        <Grid id="recipe-tags">
          <Row>
            <h2>Tags for This Recipe</h2><hr />
            <Tags
              tags={this.state.tags}
            />
          </Row>
        </Grid>
        <Grid id="recipe-instructions-directions">
          <Row>
            <Col xs={10} xsOffset={1}>
              <RecipeFilterInstructions
                directions={this.state.directions}
                ingredients={this.state.ingredients}
              />
            </Col>
          </Row>
        </Grid>
        <Grid id="recipe-history">
          <Row>
            <Col xs={6}>
              <PageHeader>Recipe History</PageHeader>
              <h4>{this.state.recipeHistory}</h4>
            </Col>
            <Col xs={6}>
              <PageHeader>Comments on this Recipe</PageHeader>
              <ListGroup className="post-list">
                {this.state.comments.map(comment =>
                  (<ListGroupItem key={comment.id}><Comment {...comment} xs={5} /></ListGroupItem>))}
                <hr />
                <AddComment
                  {...this.props.app.curRecipe}
                  curUser={this.props.app.curUser}
                  refreshPage={this.loadRecipeDetail}
                  refreshParam={this.props.app.curRecipe.id}
                />
              </ListGroup>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={12}>
              <TrendingRecipesList />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

RecipeDetailsPage.propTypes = {
  id: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  dispatchApi: PropTypes.object.isRequired,
};

export default RecipeDetailsPage;
