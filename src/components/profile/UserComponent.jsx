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
      followerDisplay: false,
      buttonToggle: false,
    };
    this.numOfFollowers = this.props.app.subscriptions.subscribees.length;
    this.subscribeToUser = this.subscribeToUser.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  getSubscriptionButton() {
    if (this.props.subscribed) {
      if (!this.state.buttonToggle) {
        return (<Button bsStyle="primary" onMouseEnter={() => this.toggleButton(true)} disabled>Subscribed!</Button>);
      }
      return (<Button bsStyle="danger" onMouseLeave={() => this.toggleButton(false)} onClick={this.unsubscribe}>Unsubscribe?</Button>);
    }
    return (<Button bsStyle="primary" onClick={this.subscribeToUser}>Click to Subscribe!</Button>);
  }

  toggleButton(bool) {
    this.setState({
      buttonToggle: bool,
    });
  }

  subscribeToUser() {
    axios.post(`${REST_URL}/api/subscriptions`, {
      id: this.props.app.curUser.id,
    });
    this.props.loadProfile(this.props.app.curUser.displayName);
  }

  unsubscribe() {
    axios.post(`${REST_URL}/api/unsubscribe`, {
      id: this.props.app.curUser.id,
    });
    this.props.loadProfile(this.props.app.curUser.displayName);
  }

  render() {
    return (
      <div>
        <PageHeader>{this.props.app.curUser.displayName}{"'s"} Profile</PageHeader>
        <Thumbnail src={this.props.app.curUser.profileImageUrl} alt="242x200">
          <h3>{this.numOfFollowers} Follower{this.props.app.curUser.followerCount > 1 ? 's' : ''}</h3>
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
  subscribed: PropTypes.bool.isRequired,
  loadProfile: PropTypes.func.isRequired,
};

export default UserComponent;
