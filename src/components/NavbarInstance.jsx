import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class NavbarInstance extends React.Component {
  changePage(toPage) {
    this.props.history.push(`/${toPage}`);
  }
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">FoodEZ</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onClick={this.changePage('test')}>
              Cooking
            </NavItem>
            <NavItem eventKey={2} onClick={this.changePage('test')}>
              Eating
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={3} onClick={this.changePage('test')}>
              Profile
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NavbarInstance);
