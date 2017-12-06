import React from 'react';
import { NavItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

const hasLoggedIn = (props) => {
  // dispatch needed for logout, showLogin functions
  const {
    dispatch,
    logoutUser,
    showLoginModal,
    authStatus,
  } = props;

  switch (authStatus) {
    case 'AUTH_LOGGED_IN':
      return (
        <NavItem onClick={logoutUser}>
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
        <NavItem onClick={showLoginModal}>
          Login
        </NavItem>
      );
  }
};

hasLoggedIn.propTypes = {
  authStatus: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  showLoginModal: PropTypes.func.isRequired,
};

export default hasLoggedIn;
