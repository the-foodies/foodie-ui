import React from 'react';
import { NavItem } from 'react-bootstrap';

export default (props) => {
  /*
      return (
        <NavItem onClick={this.props.showLoginModal}>
          Login
        </NavItem>
      );
  */
  console.log(props);
  const { dispatch } = props;
  switch (props.auth.status) {
    case 'AUTH_LOGGED_IN':
      return (
        <NavItem onClick={props.logoutUser}>
          Logout
        </NavItem>
      );
    case 'AUTH_AWAITING_RESPONSE':
      return (
        <NavItem>
          Authenticating..
        </NavItem>
      );
    default:
      return (
        <NavItem onClick={props.showLoginModal}>
            Login
        </NavItem>
      );
  }
};
