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
    console.log(this.props.displayName, this.props.id);
    // this.setState = {
    //   loading: true,
    // };
    await this.props.dispatchApi.getUserByDisplayName('monkaS')
    await this.props.dispatchApi.getPosts(2);
    console.log('IM HEREREREERRE', this.props);
    await this.setState({
      loading: false,
    });
  }
  render() {
    if (this.state.loading === true) {
      return null;
    }
    console.log('test');
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
  displayName: PropTypes.string.isRequired,
};

export default UserProfile;
