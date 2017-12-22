import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const FooterInstance = () => (
  <div>
    <Navbar fluid inverse collapseOnSelect fixedBottom>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem>Follow Us On Github</NavItem>
          <NavItem eventKey={1} href="https://github.com/adrianme213">Adrian Meza</NavItem>
          <NavItem eventKey={2} href="https://github.com/mrstlouis">Zac St Louis</NavItem>
          <NavItem eventKey={3} href="https://github.com/maxlavicka">Max Lavicka</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default FooterInstance;
