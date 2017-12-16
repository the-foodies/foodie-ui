import React from 'react';
import { Grid, Row, Col, PageHeader, Label } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TrendingCarousel from '../displays/TrendingCarousel';
import Loading from '../displays/Loading';
import HorizontalScrollBar from '../displays/HorizontalScrollBar';
import { mapDetailsToCarouselFormat, mapDetailsToHorizontalFormat } from '../../utils/detailsPage';

class RestaurantDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('heyyyyyyyyyy');
    console.log(props);
    // const images = mapDetailsToCarouselFormat({
    //   name: props.name,
    //   images: props.images,
    // });
    // const foodItems = mapDetailsToHorizontalFormat({
    //   name: props.name,
    //   foodItems: props.foodItems,
    //   image_url: props.images[0].image_url,
    // });
    // this.state = { images, foodItems };
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const id = '1'; // this.props.id.toString()
    this.loadRestaurantDetail(id);
  }

  loadRestaurantDetail(restaurantId) {
    const context = this;
    this.props.dispatchApi.getRestaurantById(restaurantId)
      .then(({ data }) => {
        console.log('data is, ', data)
        // get related recipes
        // context.props.dispatchApi.getRelatedRecipes(data.id)
        // const images = mapDetailsToCarouselFormat({
        //   name: data.name,
        //   description: data.name,
        //   images: data.ImagesRecipes,
        // });
        //
        // const info = {
        //   calories: data.calories,
        //   fat: data.fat,
        //   protein: data.protein,
        //   sodium: data.sodium,
        // };
        // const informationKeys = Object.keys(info);
        // const information = Object.values(info);
        // context.setState({
        //   difficulty: data.difficulty || 'Easy',
        //   name: data.name,
        //   comments: data.Comments,
        //   portions: data.portions || '5',
        //   rating: data.rating,
        //   recipeHistory: data.recipeHistory || 'No history',
        //   directions: data.Directions,
        //   images,
        //   information,
        //   informationKeys,
        //   ingredients: data.Ingredients,
        //   tags: data.Tags,
        //   loading: false,
        // });
      });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <div>
        <Grid id="restaurant-details-info">
          <Row>
            <Col xs={6} xsOffset={3}>
              <PageHeader>{this.props.name}</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <PageHeader>Info</PageHeader>
              <h3>Address: <Label bsStyle="info">{this.props.address}</Label></h3>
              <h3>Website: <Label bsStyle="info">{this.props.website}</Label></h3>
            </Col>
            <Col xs={8}>
              <TrendingCarousel picturesToDisplay={this.state.images} />
            </Col>
          </Row>
        </Grid>
        <PageHeader>Common Dishes from {this.props.name}</PageHeader>
        <Grid id="restaurant-food-items">
          <Row>
            <Col xs={12}>
              <HorizontalScrollBar
                picturesToDisplay={this.state.foodItems}
              />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1}>
              {this.props.tags.map(tag => (
                <Col xs={2} key={tag.id}>
                  <h5>{tag.name}<hr /></h5>
                </Col>
              ))}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

RestaurantDetailsPage.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  foodItems: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
};

export default RestaurantDetailsPage;
