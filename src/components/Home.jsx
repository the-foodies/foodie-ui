import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import TrendingCarousel from './home/TrendingCarousel';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPictures: [
        { id: 1, title: 'Tacos', description: 'Bomb tacos', url: 'https://media.timeout.com/images/103202788/image.jpg' },
        { id: 2, title: 'Pizza', description: 'Slices of heaven', url: 'http://storage.googleapis.com/bro-cdn1/zgrid/themes/10411/images/feature-pizza.jpg' },
        { id: 3, title: 'Burritos', description: 'Carne asada for dayz', url: 'http://1.bp.blogspot.com/_1wWTObAexYs/STkUe4a2pAI/AAAAAAAAC0s/2tovJkKflsw/s400/la+puerta+carne+asada+burritos.JPG' },
        { id: 4, title: 'Beer', description: 'Here to question, do you really need food?', url: 'http://1.bp.blogspot.com/-1GSWaUnbicQ/UKqTLy-o87I/AAAAAAAAAr4/ht9oXlVUMxM/s1600/beer-mug.jpg' },
      ],
    };
  }

  componentDidMount() {
    //GET request for top 4 items
    /*

    */
  }
  
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <PageHeader>Trending GrubEZ <small>Put Trending Name Here ASAP</small></PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} mdOffset={3}>
            <TrendingCarousel picturesToDisplay={this.state.displayPictures} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
