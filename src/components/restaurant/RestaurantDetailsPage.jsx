import React from 'react';
import axios from 'axios';
import { Grid, Row, Col, PageHeader, Label, ListGroupItem, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TrendingCarousel from '../displays/TrendingCarousel';
import Loading from '../displays/Loading';
import Comment from '../displays/Comment';
import AddComment from '../displays/AddComment';
import ListThumbnails from '../displays/ListThumbnails';
import Tags from '../displays/Tags';
import { mapDetailsToCarouselFormat, changeAllToCarouselFormat } from '../../utils/detailsPage';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

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
      images: [],
      similarRestaurants: [],
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
    const { name, website } = data;
    const address = data.address.slice(0, data.address.length - 14);
    const phoneNumber = data.address.slice(data.address.length - 14);
    const tags = data.Tags;
    const daTags = tags.slice(0, 1).map(item => item.name.toLowerCase());
    let similarRestaurants = await axios.get(`${REST_URL}/trending/tags`, {
      params: {
        tag: daTags,
        type: 'restaurant',
      },
    });
    similarRestaurants = similarRestaurants.data.filter(rec => rec.name !== name);
    if (similarRestaurants.length > 4) {
      similarRestaurants = similarRestaurants.slice(0, 4);
    }
    similarRestaurants = changeAllToCarouselFormat(similarRestaurants);
    console.log('similarRestaurants ', similarRestaurants);
    this.setState({
      address,
      name,
      phoneNumber,
      website,
      comments,
      images,
      similarRestaurants,
      tags,
      loading: false,
    });
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
                <h3>Comments on this Restaurant</h3>
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
        <Grid className="details-dashed-border details-page">
          <h3>Similar Restaurants We Recommend</h3>
          <ListThumbnails list={this.state.similarRestaurants} type="restaurant" />
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
