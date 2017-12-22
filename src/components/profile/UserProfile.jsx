import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import PostView from '../posts/PostView';
import UserComponent from './UserComponent';
import Loading from '../displays/Loading';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: null,
      subscribed: false,
    };
    this.profileRefresh = null;
    this.loadProfile = this.loadProfile.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    const { displayName } = this.props;
    if (this.props.app.curUser.displayName !== displayName) {
      this.loadProfile(displayName);
    } else {
      this.userData = true;
    }
    this.profileRefresh = setInterval(() => this.loadProfile(displayName), 10000);
    //
    const randomNum = Math.floor((Math.random() * 10) + 1).toString();
    this.props.dispatchApi.getRecipeById(randomNum);
    this.props.dispatchApi.getRestaurantById(randomNum);
  }

  componentWillReceiveProps(nextProps) {
    const { displayName } = nextProps;
    if (this.props.displayName !== nextProps.displayName) {
      this.userData = null;
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

  changePage() {
    this.postPage += 1;
    this.loadProfile(this.props.displayName);
  }

  async loadProfile(displayName) {
    // const comp = this;
    // load series with .then
    if (!this.userData) {
      this.setState({
        loading: true,
      });
      const result = await this.props.dispatchApi.getUserByDisplayName(displayName);
      this.userData = result.data;
      this.postPage = 1;
    }
    const loadParallel = [
      this.props.dispatchApi.getPosts(this.userData.id, this.postPage),
      this.props.dispatchApi.getUserSubscriptions(this.userData.id),
      this.getSubscriptionStatus(this.userData),
    ];
    Promise.all(loadParallel)
      .then(([,, subscribed]) => {
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
            <UserComponent
              app={this.props.app}
              auth={this.props.auth}
              subscribed={this.state.subscribed}
              loadProfile={this.loadProfile}
            />
          </Col>
          <Col xs={12} md={8}>
            <Row>
              <Col xs={12} md={12}>
                <PageHeader>My Posts</PageHeader>
              </Col>
            </Row>
            <Row>
              <PostView
                owner={this.props.app.curUser}
                refreshPage={this.loadProfile}
                posts={this.props.app.posts}
                refreshParam={this.props.displayName}
              />
            </Row>
            <Button className="pull-right" onClick={this.changePage}>Next Page</Button>
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
