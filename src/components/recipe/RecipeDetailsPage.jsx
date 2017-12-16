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
  }

  componentDidMount() {
    const id = this.props.app.curRecipe.id.toString() || '1';
    this.loadRecipeDetail(id);
  }

  loadRecipeDetail(recipeId) {
    const context = this;
    this.props.dispatchApi.getRecipeById(recipeId)
      .then(({ data }) => {
        // get related recipes
        // context.props.dispatchApi.getRelatedRecipes(data.id)
        const images = mapDetailsToCarouselFormat({
          name: data.name,
          description: data.name,
          images: data.ImagesRecipes,
        });

        const info = {
          calories: data.calories,
          fat: data.fat,
          protein: data.protein,
          sodium: data.sodium,
        };
        const informationKeys = Object.keys(info);
        const information = Object.values(info);
        context.setState({
          difficulty: data.difficulty || 'Easy',
          name: data.name,
          comments: data.Comments,
          portions: data.portions || '5',
          rating: data.rating,
          recipeHistory: data.recipeHistory || 'No history',
          directions: data.Directions,
          images,
          information,
          informationKeys,
          ingredients: data.Ingredients,
          tags: data.Tags,
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
              {this.state.informationKeys.map((item, index) =>
                (<h3 key={item}>{item}: <Label bsStyle="info">{this.state.information[index]}</Label></h3>))}
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
              {this.state.comments.map(comment =>
                (<Comment {...comment} xs={5} key={comment.id} />))}
              <hr />
              <AddComment curUser={this.props.app.curUser} id={this.props.app.curUser.id} refresh={() => { console.log('HI'); }} />
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
