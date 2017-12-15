import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, ButtonGroup, Thumbnail, PageHeader } from 'react-bootstrap';
import FollowerEntry from './FollowerEntry';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

class UserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: false,
      followerDisplay: false,
    };
    this.numOfFollowers = this.props.app.subscriptions.subscribees.length;
    this.subscribeToUser = this.subscribeToUser.bind(this);
  }

  getSubscriptionButton() {
    if (this.state.subscribed) {
      return (<Button bsStyle="primary" disabled>Subscribed!</Button>);
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

  render() {
    return (
      <div>
        <PageHeader>{this.props.app.curUser.displayName}{"'s"} Profile</PageHeader>
        <Thumbnail src={this.props.app.curUser.profileImageUrl} alt="242x200">
          <h3>{this.numOfFollowers} Follower{this.numOfFollowers > 1 ? '' : 's'}</h3>
          <div>
            <ButtonGroup>
              <Button onClick={() => this.setState({ followerDisplay: true })}>Followers</Button>
              <Button onClick={() => this.setState({ followerDisplay: false })}>Following</Button>
              {
                (this.props.auth.displayName === this.props.app.curUser.displayName) ?
                  null : this.getSubscriptionButton()
              }
            </ButtonGroup>
          </div>
          <hr />
          <div className="follower-list">
            {(this.state.followerDisplay === true) ?
              this.props.app.subscriptions.subscribees.map((sub) => {
                const user = {
                  displayName: sub['User.displayName'],
                  profileImageUrl: sub['User.profileImageUrl'],
                };
                return (<FollowerEntry user={user} key={sub.id} />);
              }) :
              this.props.app.subscriptions.subscriptions.map((sub) => {
                const user = {
                  displayName: sub['userSubscribedTo.displayName'],
                  profileImageUrl: sub['userSubscribedTo.profileImageUrl'],
                };
                return (<FollowerEntry user={user} key={sub.id} />);
              })}
          </div>
        </Thumbnail>
      </div>
    );
  }
}

UserComponent.propTypes = {
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default UserComponent;
