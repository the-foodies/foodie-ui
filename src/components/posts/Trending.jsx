import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Grid, Row, Col, ListGroup, PageHeader } from 'react-bootstrap';
import Loading from '../displays/Loading';
import PostEntry from './PostEntry';
import parseSlashes from '../../utils/parseSlashes';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: [],
    };
    this.loadTrending = this.loadTrending.bind(this);
  }
  async componentDidMount() {
    let { name } = this.props;
    name = parseSlashes(name).toLowerCase();
    this.loadTrending(name);
  }
  async componentWillReceiveProps(nextProps) {
    let { name } = nextProps;
    if (this.props.name !== name) {
      name = parseSlashes(name).toLowerCase();
      this.loadTrending(name);
    }
  }

  async loadTrending(name) {
    const query = parseSlashes(name).toLowerCase();
    const posts = await axios.get(`${REST_URL}/trending`, {
      params: {
        query,
      },
    });
    await this.setState({
      posts: posts.data,
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <div>
        <Grid>
          <Row className="homepage-title-section">
            <Col xs={12} md={10} mdOffset={1} >
              <PageHeader>Tending under: #{this.props.name}</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={10} mdOffset={1}>
              <ListGroup className="post-list">
                {this.state.posts.map(post => (
                  <PostEntry
                    owner={{
                      id: post.ImagesRecipes ?
                      post.ImagesRecipes[0].UserId
                      :
                      post.ImagesRestaurants[0].UserId,
                    }}
                    refreshPage={this.loadTrending}
                    refreshParam={this.props.name}
                    key={post.id}
                    {...post}
                  />
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Trending.propTypes = {
  name: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
};

export default Trending;
