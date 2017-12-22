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
      name: '',
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
    // this.loadRelatedRecipes = this.loadRelatedRecipes.bind(this);
  }

  componentDidMount() {
    const id = this.props.id.toString() || '1';
    this.loadRecipeDetail(id);
    // this.loadRelatedRecipes(['1', '2', '3', '4']);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ loading: true });
      this.loadRecipeDetail(nextProps.id);
    }
  }

  async loadRecipeDetail(recipeId) {
    const { data } = await this.props.dispatchApi.getRecipeById(recipeId);
    [this.owner] = data.Users;
    const images = mapDetailsToCarouselFormat({
      name: data.name,
      description: data.name,
      images: data.ImagesRecipes,
    });
    const {
      calories, fat, protein, sodium, name, rating, difficulty, portions,
    } = data;
    const info = {
      Calories: calories,
      Difficulty: difficulty || 'Easy',
      Fat: fat,
      Feeds: portions || '5',
      Protein: protein,
      Rating: rating,
      Sodium: sodium,
    };
    const informationKeys = Object.keys(info);
    const information = Object.values(info);
    const recipeHistory = data.recipeHistory || 'Here is where I tell you about this recipe\'s history.';
    const comments = data.Comments;
    const directions = data.Directions;
    const ingredients = data.Ingredients;
    const tags = data.Tags;
    await this.setState({
      name,
      comments,
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

  // async loadRelatedRecipes(recipeIds) {
  //   let data;
  //   for (let ii = 1; ii <= recipeIds.length; ii++) {
  //     data = await this.props.dispatchApi.getRecipeById(String(ii));
  //     this.setState({
  //       similarRecipes: this.state.similarRecipes.concat([data.data]),
  //     });
  //   }
  // }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <div className="details-page">
        <Grid>
          <Row className="details-title-section">
            <PageHeader>{this.state.name}</PageHeader>
          </Row>
        </Grid>
        <Grid className="details-dashed-border">
          <Row>
            <Col xs={6}>
              <Row className="details-history-section">
                <h3>Recipe History</h3>
                <p>{this.state.recipeHistory}</p>
              </Row>
              <Row className="details-comments-display">
                <h3>Comments on this Recipe</h3>
                <ListGroup className="post-list">
                  {this.state.comments.map(comment =>
                    (<ListGroupItem key={comment.id}><Comment {...comment} xs={5} /></ListGroupItem>))}
                  <hr />
                </ListGroup>
              </Row>
            </Col>
            <Col xs={6}>
              <Row className="details-carousel">
                <TrendingCarousel picturesToDisplay={this.state.images} />
              </Row>
              <Row className="details-add-comment">
                <h3>Tell Us About Your Experience With This Recipe</h3>
                <AddComment
                  {...this.props.app.curRecipe}
                  owner={this.owner}
                  refreshPage={this.loadRecipeDetail}
                  refreshParam={String(this.props.app.curRecipe.id)}
                />
              </Row>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="details-dashed-border">
              <h3>General Info</h3><hr />
              {this.state.informationKeys.map((item, index) =>
                (<Col xs={3} key={item}><h4>{item}: <Label bsStyle="info">{this.state.information[index]}</Label></h4></Col>))}
          </Row>
        </Grid>
        <Grid>
          <Row className="details-dashed-border">
            <h3>Tags for This Recipe</h3>
            <h5>Clickable tags! Click one to see similar posts</h5>
            <Tags
              tags={this.state.tags}
            />
          </Row>
        </Grid>
        <Grid className="details-dashed-border">
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
          <Row className="details-dashed-border">
            <Col xs={12}>
              {/* <TrendingRecipesList />*/}
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
