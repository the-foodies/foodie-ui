import React from 'react';
import { Nav, NavItem, Grid, Col } from 'react-bootstrap';

const FooterInstance = () => (
  <div>
    <Grid>
      <Col xs={6} xsOffset={3}>
        <h2>Follow Us On Github</h2>
        <Nav bsStyle="link" justified>
          <NavItem eventKey={1} href="https://github.com/adrianme213">Adrian Meza</NavItem>
          <NavItem eventKey={2} href="https://github.com/mrstlouis">Zac St Louis</NavItem>
          <NavItem eventKey={3} href="https://github.com/maxlavicka">Max Lavicka</NavItem>
        </Nav>
      </Col>
    </Grid>
    <br /><br /><p />
  </div>
);

export default FooterInstance;
