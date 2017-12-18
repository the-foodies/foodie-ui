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
      phoneNumber: '',
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
        console.log(data);
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
        const { name, website } = data;
        const address = data.address.slice(0, data.address.length - 14);
        const phoneNumber = data.address.slice(data.address.length - 14);
        context.setState({
          address,
          name,
          phoneNumber,
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
        </Grid>
        <Grid id="restaurant-food-items">
          <Row>
            <Col xs={5}>
              <TrendingCarousel picturesToDisplay={this.state.images} />
            </Col>
            <h4>Common Dishes from {this.state.name}</h4>
            <Col xs={5}>
              <HorizontalScrollBar
                picturesToDisplay={this.state.foodItems}
              />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <h4>Restaurant Tags: </h4>
          <Row>
<<<<<<< HEAD
            <Col xs={10} xsOffset={1}>
              <h5>
                {this.state.tags.map(tag => (
                  <span className="tag-list" key={tag.id}>
                    <Label bsStyle="info">#{tag.name}</Label>
                    {' '}
                  </span>
                ))}
              </h5>
            </Col>
=======
            {this.state.tags.map(tag =>
              (<Col xs={2} key={tag.id}><h4><Label bsStyle="primary">#{tag.name}</Label></h4></Col>))}
>>>>>>> [feat]
          </Row>
        </Grid>
        <Grid id="recipe-details-history">
          <Row>
            <Col xs={6}>
              <PageHeader>Info</PageHeader>
              <h3>Phone Number: <Label bsStyle="info">{this.state.phoneNumber}</Label></h3>
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
