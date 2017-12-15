import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import PostView from '../posts/PostView';
import UserComponent from './UserComponent';
import Loading from '../displays/Loading';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      subscribed: false,
    };
    this.profileRefresh = null;
    this.subscribeToUser = this.subscribeToUser.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
  }
  componentDidMount() {
    const { displayName } = this.props;
    this.loadProfile(displayName);
    this.profileRefresh = setInterval(() => this.loadProfile(displayName), 10000);
  }

  componentWillReceiveProps(nextProps) {
    const { displayName } = nextProps;
    if (this.props.displayName !== nextProps.displayName) {
      this.setState({
        loading: true,
      });
      this.loadProfile(displayName);
      if (this.profileRefresh) {
        clearInterval(this.profileRefresh);
      }
      this.profileRefresh = setInterval(() => this.loadProfile(displayName), 10000);
    }
  }

  componentWillUnmount() {
    if (this.profileRefresh) {
      clearInterval(this.profileRefresh);
    }
  }

  getSubscriptionButton() {
    if (this.state.subscribed) {
      return (<Button bsStyle="primary" disabled>Already Subscribed!</Button>);
    }
    return (<Button bsStyle="primary" onClick={this.subscribeToUser}>Click to Subscribe!</Button>);
  }
  async getSubscriptionStatus(user) {
    if (this.props.auth.displayName !== user.displayName) {
      const { data } = await axios.get(`${REST_URL}/api/isSubbed`, {
        params: {
          id: user.id,
        },
      });
      return data;
    }
    return false;
  }

  loadProfile(displayName) {
    const comp = this;
    // load series with .then
    this.props.dispatchApi.getUserByDisplayName(displayName)
      .then(({ data }) => {
        const loadParallel = [
          comp.props.dispatchApi.getPosts(data.id),
          comp.props.dispatchApi.getUserSubscriptions(data.id),
          comp.getSubscriptionStatus(data),
        ];
        return Promise.all(loadParallel);
      }).then(([,, subscribed]) => {
        // results are ordered by array order
        comp.setState({
          subscribed,
          loading: false,
        });
      });
  }
  subscribeToUser() {
    axios.post(`${REST_URL}/api/subscriptions`, {
      id: this.props.app.curUser.id,
    });
    this.setState({
      subscribed: true,
    });
  }

  render() {
    if (this.state.loading === true) {
      return (<Loading />);
    }
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4}>
            <UserComponent app={this.props.app} auth={this.props.auth} />
          </Col>
          <Col xs={12} md={8}>
            <PostView
              curUser={this.props.app.curUser}
              loadProfile={this.loadProfile}
              posts={this.props.app.posts}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

UserProfile.propTypes = {
  displayName: PropTypes.string.isRequired,
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  dispatchApi: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default UserProfile;
