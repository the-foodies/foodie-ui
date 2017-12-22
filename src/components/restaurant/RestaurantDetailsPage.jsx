import React from 'react';
import { Grid, Row, Col, PageHeader, Label, ListGroupItem, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TrendingCarousel from '../displays/TrendingCarousel';
import Loading from '../displays/Loading';
import Comment from '../displays/Comment';
import AddComment from '../displays/AddComment';
// import HorizontalScrollBar from '../displays/HorizontalScrollBar';
import Tags from '../displays/Tags';
import { mapDetailsToCarouselFormat, mapDetailsToHorizontalFormat } from '../../utils/detailsPage';

class RestaurantDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      name: '',
      phoneNumber: '',
      restaurantHistory: 'This is a dank spot to eat at.',
      website: '',
      comments: [],
      // foodItems: [],
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({ loading: true });
      this.loadRestaurantDetail(nextProps.id);
    }
  }

  async loadRestaurantDetail(restaurantId) {
    const { data } = await this.props.dispatchApi.getRestaurantById(restaurantId);
    [this.owner] = data.Users;
    const images = mapDetailsToCarouselFormat({
      name: data.name,
      description: data.name,
      images: data.ImagesRestaurants,
    });
    const comments = data.Comments;
    // const foodItems = mapDetailsToHorizontalFormat({
    //   foodItems: data.FoodItems,
    //   image_url: data.ImagesRestaurants[0].image_url,
    // });
    const tags = data.Tags;
    const { name, website } = data;
    const address = data.address.slice(0, data.address.length - 14);
    const phoneNumber = data.address.slice(data.address.length - 14);
    this.setState({
      address,
      name,
      phoneNumber,
      website,
      comments,
      // foodItems,
      images,
      tags,
      loading: false,
    });

    // get related restaurants
    // context.props.dispatchApi.getRelatedRestaurants(data.id)
  }

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
                <h3>Restaurant History</h3>
                <p>{this.state.restaurantHistory}</p>
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
                <h3>Tell Us About Your Experience With This Restaurant</h3>
                <AddComment
                  {...this.props.app.curRestaurant}
                  owner={this.owner}
                  refreshPage={this.loadRestaurantDetail}
                  refreshParam={String(this.props.app.curRestaurant.id)}
                />
              </Row>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="details-dashed-border">
            <Col xs={6}>
              <h3>Restaurant Tags: </h3>
              <Tags
                tags={this.state.tags}
              />
            </Col>
            <Col xs={6}>
              <h3>Info</h3>
              <h4>Phone Number: <Label bsStyle="info">{this.state.phoneNumber}</Label></h4>
              <h4>Address: <Label bsStyle="info">{this.state.address}</Label></h4>
              <h4>Website: <Label bsStyle="info">{this.state.website}</Label></h4>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="details-dashed-border">
            <Col xs={12}>
              {/* <TrendingRestaurantsList />*/}
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
