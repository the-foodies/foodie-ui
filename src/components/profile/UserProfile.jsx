import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import PostView from '../posts/PostView';
import UserComponent from './UserComponent';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentWillMount() {
    console.log(this.props);
    await this.props.dispatchApi.getUserByDisplayName('monkaS');
    await this.props.dispatchApi.getPosts(1);
    await this.props.dispatchApi.getUserSubscriptions(1);
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

  render() {
    if (this.state.loading === true) {
      return null;
    }
    console.log(this.props);
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4}>
            <UserComponent app={this.props.app} auth={this.props.auth} />
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
  auth: PropTypes.object.isRequired,
  dispatchApi: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default UserProfile;
