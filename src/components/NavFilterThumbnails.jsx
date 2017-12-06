import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap/lib';
import ListThumbnails from './ListThumbnails';


class NavFilterThumbnails extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: '1',
      displayPictures: [
        { id: 1, name: 'Tacos', description: 'Bomb tacos', url: 'https://media.timeout.com/images/103202788/image.jpg' },
        { id: 2, name: 'Pizza', description: 'Slices of heaven', url: 'http://storage.googleapis.com/bro-cdn1/zgrid/themes/10411/images/feature-pizza.jpg' },
        { id: 3, name: 'Burritos', description: 'Carne asada for dayz', url: 'http://1.bp.blogspot.com/_1wWTObAexYs/STkUe4a2pAI/AAAAAAAAC0s/2tovJkKflsw/s400/la+puerta+carne+asada+burritos.JPG' },
        { id: 4, name: 'Beer', description: 'Here to question, do you really need food?', url: 'http://1.bp.blogspot.com/-1GSWaUnbicQ/UKqTLy-o87I/AAAAAAAAAr4/ht9oXlVUMxM/s1600/beer-mug.jpg' },
      ],
    };
  }

  handleSelect(eventKey) {
    event.preventDefault();
    this.setState({
      activeKey: `${eventKey}`,
      displayPictures: [
        { id: 4, name: 'Beer', description: 'Here to question, do you really need food?', url: 'http://1.bp.blogspot.com/-1GSWaUnbicQ/UKqTLy-o87I/AAAAAAAAAr4/ht9oXlVUMxM/s1600/beer-mug.jpg' },
        { id: 1, name: 'Tacos', description: 'Bomb tacos', url: 'https://media.timeout.com/images/103202788/image.jpg' },
        { id: 2, name: 'Pizza', description: 'Slices of heaven', url: 'http://storage.googleapis.com/bro-cdn1/zgrid/themes/10411/images/feature-pizza.jpg' },
        { id: 3, name: 'Burritos', description: 'Carne asada for dayz', url: 'http://1.bp.blogspot.com/_1wWTObAexYs/STkUe4a2pAI/AAAAAAAAC0s/2tovJkKflsw/s400/la+puerta+carne+asada+burritos.JPG' },
      ],
    });
    console.log(`Selected ${eventKey}`);
  }

  render() {
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
          <NavItem eventKey="1">Da Most Recommended</NavItem>
          <NavItem eventKey="2">Da Quickest</NavItem>
          <NavItem eventKey="3">Da Most Viewed</NavItem>
          <NavItem eventKey="4">Da Staff Favorites</NavItem>
        </Nav>
        <Grid>
          <Row>
            <Col xs={12} md={12}>
              <ListThumbnails list={this.state.displayPictures} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default NavFilterThumbnails;
