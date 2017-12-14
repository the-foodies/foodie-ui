import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Grid, Row, Col, Button, ButtonGroup, Thumbnail, PageHeader } from 'react-bootstrap';
import PostView from '../posts/PostView';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      subscribed: false,
      followerDisplay: true,
    };
    this.swapView = this.swapView.bind(this);
    this.subscribeToUser = this.subscribeToUser.bind(this);
  }
  async componentWillMount() {
<<<<<<< HEAD
    console.log(this.props);
    const userId = await this.props.dispatchApi.getUserByDisplayName('monkaS');
    await this.props.dispatchApi.getPosts(1);
    await this.props.dispatchApi.getUserSubscriptions(1);
    if (this.props.auth.displayName !== this.props.app.curUser.displayName) {
      const bool = await axios.get(`${REST_URL}/api/isSubbed`, {
        params: {
          id: this.props.app.curUser.displayName,
        },
      });
      console.log('isSubbed?', bool);
      this.setState({
        subscribed: bool.data,
      });
    }
=======
    console.log(this.props.displayName, this.props.id);
    // this.setState = {
    //   loading: true,
    // };
    await this.props.dispatchApi.getUserByDisplayName('monkaS')
    await this.props.dispatchApi.getPosts(1);
    console.log('IM HEREREREERRE', this.props);
>>>>>>> [feat fix]
    await this.setState({
      loading: false,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.app.status === 'GETTING_API') {
      return this.state.loading || nextState.loading;
    }
    return true;
  }

  getSubscriptionButton() {
    if (this.state.subscribed) {
      return (<Button bsStyle="primary" disabled>Already Subscribed!</Button>);
    }
    return (<Button bsStyle="primary" onClick={this.subscribeToUser}>Click to Subscribe!</Button>);
  }

  subscribeToUser() {
    axios.post(`${REST_URL}/api/subscriptions`, {
      id: this.props.app.curUser.id,
    });
    this.setState({
      subscribed: true,
    });
  }

  swapView(bool) {
    this.setState({
      followerDisplay: bool,
    });
  }

  render() {
    if (this.state.loading === true) {
      return null;
    }
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4}>
            <PageHeader>{this.props.app.curUser.displayName}{"'s"} Profile</PageHeader>
            <Thumbnail src={this.props.app.curUser.profileImageUrl} alt="242x200">
              <h3>10000 Followers</h3>
              {(this.props.auth.displayName === this.props.app.curUser.displayName) ? null : this.getSubscriptionButton()}
              <div>
                <ButtonGroup>
                  <Button onClick={() => this.swapView(true)}>Followers</Button>
                  <Button onClick={() => this.swapView(false)}>Following</Button>
                </ButtonGroup>
              </div>
              {(this.state.followerDisplay === true) ? <h3>FOLLOWER DISPLAY</h3> :
              <h3>FOLLOWING DISPLAY</h3>}
            </Thumbnail>
          </Col>
          <Col xs={12} md={8}>
            <PostView posts={this.props.app.posts} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

UserProfile.propTypes = {
  app: PropTypes.object.isRequired,
  dispatchApi: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default UserProfile;
