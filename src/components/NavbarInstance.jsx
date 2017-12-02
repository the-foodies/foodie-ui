import React from 'react';
import { Nav, Navbar, NavItem, FormGroup, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import showLoginModal from '../actions/showLoginModal';


class NavbarInstance extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  changePage(toPage) {
    this.props.history.push(`/${toPage}`);
  }
  render() {
    return (
      <Navbar inverse collapseOnSelect staticTop>
        <Navbar.Header>
          <Navbar.Brand onClick={() => { this.changePage('test'); }}>
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
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="search for food" />
            </FormGroup>
          </Navbar.Form>
          <Nav pullRight>
            <NavItem eventKey={3} onClick={this.props.showLoginModal}>
              Login
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavbarInstance.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NavbarInstance);
