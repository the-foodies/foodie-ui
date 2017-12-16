import React from 'react';
import { Nav, Navbar, NavItem, FormGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import HasLoggedIn from './hasLoggedIn';
import NavSearch from './search';

const NavbarInstance = (props) => {
  const {
    dispatch,
    app,
    auth,
    logoutUser,
    showLoginModal,
  } = props;
  const changePage = (toPage) => {
    if (toPage === 'profile') {
      if (auth.displayName !== 'guest') {
        props.history.push({
          pathname: `/profile/${auth.displayName}`,
          state: { id: null },
        });
      }
    } else if (toPage === 'recipe') {
      props.history.push({
        pathname: `/recipe/${app.curRecipe.name}/${app.curRecipe.id}`,
        state: { id: null },
      });
    } else if (toPage === 'restaurant') {
      props.history.push({
        pathname: `/restaurant/${app.curRestaurant.name}/${app.curRestaurant.id}`,
        state: { id: null },
      });
    } else {
      props.history.push(`/${toPage}`);
    }
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
            <NavSearch />
          </FormGroup>
        </Navbar.Form>
        <Nav>
          <NavItem eventKey={1} onClick={() => { changePage('recipes-home'); }}>
            Cooking
          </NavItem>
          <NavItem eventKey={2} onClick={() => { changePage('eating'); }}>
            Eating
          </NavItem>
          <NavItem eventKey={4} onClick={() => { changePage('recipe-submission'); }}>
            Recipe Submission
          </NavItem>
          <NavItem eventKey={5} onClick={() => { changePage('recipe'); }}>
            Recipe Details
          </NavItem>
          <NavItem eventKey={6} onClick={() => { changePage('restaurant'); }}>
            Restaurant Details
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem
            className="navbar-username"
            onClick={() => { changePage('profile'); }}
          >{auth.displayName}
          </NavItem>
          <HasLoggedIn
            dispatch={dispatch}
            authStatus={auth.status}
            logoutUser={logoutUser}
            showLoginModal={showLoginModal}
            eventKey={3}
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarInstance.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  showLoginModal: PropTypes.func.isRequired,
};

export default withRouter(NavbarInstance);
