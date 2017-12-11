import React from 'react';
import { Nav, Navbar, NavItem, FormGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import HasLoggedIn from './nav/hasLoggedIn';
import NavSearch from './nav/search';

const NavbarInstance = (props) => {
  const {
    dispatch,
    auth,
    logoutUser,
    showLoginModal,
  } = props;
  const changePage = (toPage) => {
    props.history.push(`/${toPage}`);
  };
  return (
    <Navbar fluid inverse collapseOnSelect staticTop>
      <Navbar.Header>
        <Navbar.Brand onClick={() => { changePage(''); }}>
          FoodEZ
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form pullLeft>
          <FormGroup>
            <NavSearch className="nav-search" />
          </FormGroup>
        </Navbar.Form>
        <Nav>
          <NavItem eventKey={1} onClick={() => { changePage('recipes'); }}>
            Cooking
          </NavItem>
          <NavItem eventKey={2} onClick={() => { changePage('eating'); }}>
            Eating
          </NavItem>
          <NavItem eventKey={3} onClick={() => { changePage('profile'); }}>
            Profile
          </NavItem>
          <NavItem eventKey={4} onClick={() => { changePage('recipe-submission'); }}>
            Recipe Submission
          </NavItem>
          <NavItem eventKey={4} onClick={() => { changePage('details'); }}>
            Details
          </NavItem>
        </Nav>
        <Nav pullRight>
          <HasLoggedIn
            dispatch={dispatch}
            authStatus={auth.status}
            logoutUser={logoutUser}
            showLoginModal={showLoginModal}
            eventKey={3}
          />
        </Nav>
        <Navbar.Text
          className="navbar-username"
          pullRight
        >{auth.username}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarInstance.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  showLoginModal: PropTypes.func.isRequired,
};

export default withRouter(NavbarInstance);
