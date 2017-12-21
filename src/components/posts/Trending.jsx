import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import Loading from '../displays/Loading';
import PostView from './PostView';
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
    console.log(name);
    const posts = await axios.get(`${REST_URL}/trending`, {
      params: {
        query: name,
      },
    });
    console.log(posts.data);
    this.setState({
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
          <Row>
            <Col xs={12} xsOffset={0} md={10} mdOffset={1}>
              <PostView
                curUser={this.props.app.curUser}
                refreshPage={this.loadTrending}
                posts={this.state.posts}
                refreshParam={this.props.name}
              />
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
