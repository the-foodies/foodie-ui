import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import TrendingCarousel from './home/TrendingCarousel';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <PageHeader>Trending GrubEZ <small>Put Trending Name Here ASAP</small></PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={10} mdOffset={1}>
            <TrendingCarousel />
          </Col>
        </Row>
      </Grid>
    );
  }
};

export default Home;
