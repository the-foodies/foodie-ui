import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import TrendingCarousel from '../displays/TrendingCarousel';
import ListRecommendedItems from '../displays/ListRecommendedItems';
import HomeFilterThumbnails from './HomeFilterThumbnails';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPictures: [
        { id: 1, name: 'Tacos', description: 'Bomb tacos', image_url: 'https://media.timeout.com/images/103202788/image.jpg' },
        { id: 2, name: 'Pizza', description: 'Slices of heaven', image_url: 'http://storage.googleapis.com/bro-cdn1/zgrid/themes/10411/images/feature-pizza.jpg' },
        { id: 3, name: 'Burritos', description: 'Carne asada for dayz', image_url: 'http://1.bp.blogspot.com/_1wWTObAexYs/STkUe4a2pAI/AAAAAAAAC0s/2tovJkKflsw/s400/la+puerta+carne+asada+burritos.JPG' },
        { id: 4, name: 'Beer', description: 'Here to question, do you really need food?', image_url: 'http://1.bp.blogspot.com/-1GSWaUnbicQ/UKqTLy-o87I/AAAAAAAAAr4/ht9oXlVUMxM/s1600/beer-mug.jpg' },
        { id: 5, name: 'Tacos', description: 'Bomb tacos', image_url: 'https://media.timeout.com/images/103202788/image.jpg' },
        { id: 6, name: 'Pizza', description: 'Slices of heaven', image_url: 'http://storage.googleapis.com/bro-cdn1/zgrid/themes/10411/images/feature-pizza.jpg' },
        { id: 7, name: 'Burritos', description: 'Carne asada for dayz', image_url: 'http://1.bp.blogspot.com/_1wWTObAexYs/STkUe4a2pAI/AAAAAAAAC0s/2tovJkKflsw/s400/la+puerta+carne+asada+burritos.JPG' },
        { id: 8, name: 'Beer', description: 'Here to question, do you really need food?', image_url: 'http://1.bp.blogspot.com/-1GSWaUnbicQ/UKqTLy-o87I/AAAAAAAAAr4/ht9oXlVUMxM/s1600/beer-mug.jpg' },
      ],
      seasonalItems: [
        { id: 1, name: 'Tacos', description: 'Bomb tacos', image_url: 'https://media.timeout.com/images/103202788/image.jpg' },
        { id: 2, name: 'Pizza', description: 'Slices of heaven', image_url: 'http://storage.googleapis.com/bro-cdn1/zgrid/themes/10411/images/feature-pizza.jpg' },
        { id: 3, name: 'Burritos', description: 'Carne asada for dayz', image_url: 'http://1.bp.blogspot.com/_1wWTObAexYs/STkUe4a2pAI/AAAAAAAAC0s/2tovJkKflsw/s400/la+puerta+carne+asada+burritos.JPG' },
      ],
    };
  }

  componentDidMount() {
    /*
    */
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <PageHeader>Trending GrubEZ <small>Put Trending Name Here ASAP</small></PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <TrendingCarousel picturesToDisplay={this.state.displayPictures} />
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <ListRecommendedItems list={this.state.seasonalItems} />
          </Col>
          <Col xs={6} md={6}>
            <h1>Other Stuff</h1>
            <p>Nuts</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} mdOffset={4}>
            <PageHeader>Filter Trending Below<br />
              <small>Trending Now</small>
            </PageHeader>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={8}>
            <HomeFilterThumbnails />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
