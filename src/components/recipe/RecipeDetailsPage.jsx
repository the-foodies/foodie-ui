import React from 'react';
import { Grid, Row, Col, PageHeader, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { mapDetailsToCarouselFormat } from '../../utils/detailsPage';
import TrendingCarousel from '../displays/TrendingCarousel';
import RecipeFilterInstructions from './RecipeFilterInstructions';
import HorizontalScrollBar from '../displays/HorizontalScrollBar';
import Loading from '../displays/Loading';
import Comment from '../displays/Comment';
import AddComment from '../displays/AddComment';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

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
    this.loadRecipeDetail = this.loadRecipeDetail.bind(this);
  }

  componentDidMount() {
    const id = this.props.id.toString() || '1';
    this.loadRecipeDetail(id);
  }

  loadRecipeDetail(recipeId) {
    // const context = this;
    this.props.dispatchApi.getRecipeById(recipeId)
      .then(({ data }) => {
        // get related recipes
        // context.props.dispatchApi.getRelatedRecipes(data.id)
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
        this.setState({
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
      });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <div>
        <Grid id="recipe-details-info">
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
            <PageHeader>Tags for This Recipe</PageHeader>
            {this.state.tags.map(tag =>
              (<Col xs={2} key={tag.id}><h4><Label bsStyle="primary">#{tag.name}</Label></h4></Col>))}
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
        <Grid id="recipe-details-history">
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
  id: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  dispatchApi: PropTypes.object.isRequired,
};

export default RecipeDetailsPage;
