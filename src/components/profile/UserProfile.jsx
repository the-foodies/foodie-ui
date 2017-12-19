import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
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
    this.loadProfile = this.loadProfile.bind(this);
  }
  componentDidMount() {
    const { displayName } = this.props;
    this.loadProfile(displayName);
    this.profileRefresh = setInterval(() => this.loadProfile(displayName), 10000);
    //
    const randomNum = Math.floor((Math.random() * 10) + 1).toString();
    this.props.dispatchApi.getRecipeById(randomNum);
    this.props.dispatchApi.getRestaurantById(randomNum);
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
    // const comp = this;
    // load series with .then
    this.props.dispatchApi.getUserByDisplayName(displayName)
      .then(({ data }) => {
        const loadParallel = [
          this.props.dispatchApi.getPosts(data.id),
          this.props.dispatchApi.getUserSubscriptions(data.id),
          this.getSubscriptionStatus(data),
        ];
        return Promise.all(loadParallel);
      }).then(([,, subscribed]) => {
        // results are ordered by array order
        this.setState({
          subscribed,
          loading: false,
        });
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
            <UserComponent app={this.props.app} auth={this.props.auth} subscribed={this.state.subscribed} loadProfile={this.loadProfile} />
          </Col>
          <Col xs={12} md={8}>
            <PostView
              curUser={this.props.app.curUser}
              refreshPage={this.loadProfile}
              posts={this.props.app.posts}
              refreshParam={this.props.app.curUser.displayName}
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
