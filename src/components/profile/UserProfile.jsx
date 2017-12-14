import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Thumbnail, PageHeader } from 'react-bootstrap';
import PostView from '../posts/PostView';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentWillMount() {
    await this.props.dispatchApi.getUserByDisplayName('monkaS');
    await this.props.dispatchApi.getPosts(1);
    await this.setState({
      loading: false,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.loading || nextState.loading;
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
  app: PropTypes.objectOf(PropTypes.object).isRequired,
  dispatchApi: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default UserProfile;
