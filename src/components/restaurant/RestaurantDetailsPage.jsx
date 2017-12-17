import React from 'react';
import { Grid, Row, Col, PageHeader, Label, ListGroupItem, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TrendingCarousel from '../displays/TrendingCarousel';
import Loading from '../displays/Loading';
import Comment from '../displays/Comment';
import AddComment from '../displays/AddComment';
import HorizontalScrollBar from '../displays/HorizontalScrollBar';
import { mapDetailsToCarouselFormat, mapDetailsToHorizontalFormat } from '../../utils/detailsPage';

class RestaurantDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('heyyyyyyyyyy');
    console.log(props);
    this.state = {
      address: '',
      name: '',
      website: '',
      comments: [],
      foodItems: [],
      images: [],
      tags: [],
      loading: true,
    };
    this.loadRestaurantDetail = this.loadRestaurantDetail.bind(this);
  }

  componentDidMount() {
    const id = this.props.id || '1';
    this.loadRestaurantDetail(id);
  }

  loadRestaurantDetail(restaurantId) {
    const context = this;
    this.props.dispatchApi.getRestaurantById(restaurantId)
      .then(({ data }) => {
        // get related restaurants
        // context.props.dispatchApi.getRelatedRestaurants(data.id)
        const images = mapDetailsToCarouselFormat({
          name: data.name,
          description: data.name,
          images: data.ImagesRestaurants,
        });
        const comments = data.Comments;
        const foodItems = mapDetailsToHorizontalFormat({
          foodItems: data.FoodItems,
          image_url: data.ImagesRestaurants[0].image_url,
        });
        const tags = data.Tags;
        const { address, name, website } = data;
        context.setState({
          address,
          name,
          website,
          comments,
          foodItems,
          images,
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
        <Grid id="restaurant-details-info">
          <Row>
            <Col xs={6} xsOffset={3}>
              <PageHeader>{this.state.name}</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={10}>
              <TrendingCarousel picturesToDisplay={this.state.images} />
            </Col>
          </Row>
        </Grid>
        <PageHeader>Common Dishes from {this.state.name}</PageHeader>
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
              {this.state.tags.map(tag => (
                <Col xs={2} key={tag.id}>
                  <h5>{tag.name}<hr /></h5>
                </Col>
              ))}
            </Col>
          </Row>
        </Grid>
        <Grid id="recipe-details-history">
          <Row>
            <Col xs={6}>
              <PageHeader>Info</PageHeader>
              <h3>Address: <Label bsStyle="info">{this.state.address}</Label></h3>
              <h3>Website: <Label bsStyle="info">{this.state.website}</Label></h3>
            </Col>
            <Col xs={6}>
              <PageHeader>Comments for Items From This Restaurant</PageHeader>
              <ListGroup className="post-list">
                {this.state.comments.map(comment =>
                  (<ListGroupItem key={comment.id}><Comment {...comment} xs={5} /></ListGroupItem>))}
                <hr />
                <AddComment
                  {...this.props.app.curRestaurant}
                  curUser={this.props.app.curUser}
                  refreshPage={this.loadRestaurantDetail}
                  refreshParam={this.props.app.curRestaurant.id}
                />
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

RestaurantDetailsPage.propTypes = {
  id: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  dispatchApi: PropTypes.object.isRequired,
};

export default RestaurantDetailsPage;
