import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Grid, Row, Col, ListGroup } from 'react-bootstrap';
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
  }
  async componentDidMount() {
    let { name } = this.props;
    name = parseSlashes(name).toLowerCase();
    await this.loadTrending(name);
  }
  async componentWillReceiveProps(nextProps) {
    let { name } = nextProps;
    if (this.props.name !== name) {
      name = parseSlashes(name).toLowerCase();
      await this.loadTrending(name);
    }
  }

  async loadTrending(name) {
    console.log(name);
    const posts = await axios.get(`${REST_URL}/trending`, {
      params: {
        query: name,
      },
    });
    console.log(posts.data);
    console.log('this ', this)
    await this.setState({
      posts: posts.data,
      loading: false,
    });
    console.log('all done')
  }

  render() {
    if (this.state.loading) {
      return (<Loading />);
    }
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} md={12}>
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
