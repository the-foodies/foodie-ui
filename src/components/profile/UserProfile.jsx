import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Thumbnail, PageHeader } from 'react-bootstrap';
import PostView from '../posts/PostView';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentWillMount() {
    console.log(this.props.displayName, this.props.id);
    // this.setState = {
    //   loading: true,
    // };
    await this.props.dispatchApi.getUserByDisplayName('monkaS');
    await this.props.dispatchApi.getPosts(1);
    await this.props.dispatchApi.getUserSubscriptions(1);
    console.log('IM HEREREREERRE', this.props);
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
              {(this.props.auth.displayName === this.props.app.curUser.displayName) ?
                null : <Button type="button">Click to Subscribe!</Button>}
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
