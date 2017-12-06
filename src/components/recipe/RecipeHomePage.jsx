import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import TrendingCarousel from '../home/TrendingCarousel';
import ListThumbnails from '../ListThumbnails';

class RecipeHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Four Mouthwatering Recipes for You',
      displayRecipes: [
        { id: 1, name: 'Tacos', description: 'Bomb tacos', url: 'https://media.timeout.com/images/103202788/image.jpg' },
        { id: 2, name: 'Pizza', description: 'Slices of heaven', url: 'http://storage.googleapis.com/bro-cdn1/zgrid/themes/10411/images/feature-pizza.jpg' },
        { id: 3, name: 'Burritos', description: 'Carne asada for dayz', url: 'http://1.bp.blogspot.com/_1wWTObAexYs/STkUe4a2pAI/AAAAAAAAC0s/2tovJkKflsw/s400/la+puerta+carne+asada+burritos.JPG' },
        { id: 4, name: 'Beer', description: 'Here to question, do you really need food?', url: 'http://1.bp.blogspot.com/-1GSWaUnbicQ/UKqTLy-o87I/AAAAAAAAAr4/ht9oXlVUMxM/s1600/beer-mug.jpg' },
      ],
      trendingRecipes: [
        { id: 1, name: 'Tacos', description: 'Bomb tacos', url: 'https://media.timeout.com/images/103202788/image.jpg' },
        { id: 2, name: 'Pizza', description: 'Slices of heaven', url: 'http://storage.googleapis.com/bro-cdn1/zgrid/themes/10411/images/feature-pizza.jpg' },
        { id: 3, name: 'Burritos', description: 'Carne asada for dayz', url: 'http://1.bp.blogspot.com/_1wWTObAexYs/STkUe4a2pAI/AAAAAAAAC0s/2tovJkKflsw/s400/la+puerta+carne+asada+burritos.JPG' },
        { id: 4, name: 'Beer', description: 'Here to question, do you really need food?', url: 'http://1.bp.blogspot.com/-1GSWaUnbicQ/UKqTLy-o87I/AAAAAAAAAr4/ht9oXlVUMxM/s1600/beer-mug.jpg' },
      ],
    };
  }

  componentDidMount() {
    /*
    */
  }

  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <Grid>
          <Row>
            <Col xs={6} xsOffset={6}>
              <h1>TITLE</h1>
              <p>Recipe Details</p>
              <TrendingCarousel picturesToDisplay={this.state.displayRecipes} />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <ListThumbnails list={this.state.trendingRecipes} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RecipeHomePage;
