import React from 'react';
import { Nav, Navbar, NavItem, FormGroup, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import HasLoggedIn from './nav/hasLoggedIn';


class NavbarInstance extends React.Component {
  constructor(props) {
    super(props);
  }
  changePage(toPage) {
    this.props.history.push(`/${toPage}`);
  }
  render() {
    return (
      <Navbar inverse collapseOnSelect staticTop>
        <Navbar.Header>
          <Navbar.Brand onClick={() => { this.changePage(''); }}>
            FoodEZ
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onClick={() => { this.changePage('test'); }}>
              Cooking
            </NavItem>
            <NavItem eventKey={2} onClick={() => { this.changePage('test'); }}>
              Eating
            </NavItem>
          </Nav>
          <Nav pullRight>
            <HasLoggedIn
              dispatch={this.props.dispatch}
              auth={this.props.auth}
              logoutUser={this.props.logoutUser}
              showLoginModal={this.props.showLoginModal}
              eventKey={3}
            />
          </Nav>
          <Navbar.Text className="navbar-username" pullRight>{this.props.auth.username}</Navbar.Text>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl type="text" placeholder="search for food" />
            </FormGroup>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavbarInstance.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NavbarInstance);
