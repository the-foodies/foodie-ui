import React from 'react';
import { Row, Tabs, Tab } from 'react-bootstrap';
import ListThumbnails from '../displays/ListThumbnails';


class NavFilterThumbnails extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: '1',
      displayPictures: [
        { id: 1, name: 'Tacos', description: 'Bomb tacos', url: 'https://media.timeout.com/images/103202788/image.jpg' },
        { id: 2, name: 'Pizza', description: 'Slices of heaven', url: 'https://storage.googleapis.com/bro-cdn1/zgrid/themes/10411/images/feature-pizza.jpg' },
        { id: 3, name: 'Burritos', description: 'Carne asada for dayz', url: 'https://1.bp.blogspot.com/_1wWTObAexYs/STkUe4a2pAI/AAAAAAAAC0s/2tovJkKflsw/s400/la+puerta+carne+asada+burritos.JPG' },
        { id: 4, name: 'Beer', description: 'Here to question, do you really need food?', url: 'https://1.bp.blogspot.com/-1GSWaUnbicQ/UKqTLy-o87I/AAAAAAAAAr4/ht9oXlVUMxM/s1600/beer-mug.jpg' },
      ],
    };
  }

  handleSelect(eventKey) {
    event.preventDefault();
    this.setState({
      activeKey: `${eventKey}`,
      displayPictures: [
        { id: 4, name: 'Beer', description: 'Here to question, do you really need food?', url: 'https://1.bp.blogspot.com/-1GSWaUnbicQ/UKqTLy-o87I/AAAAAAAAAr4/ht9oXlVUMxM/s1600/beer-mug.jpg' },
        { id: 1, name: 'Tacos', description: 'Bomb tacos', url: 'https://media.timeout.com/images/103202788/image.jpg' },
        { id: 2, name: 'Pizza', description: 'Slices of heaven', url: 'https://storage.googleapis.com/bro-cdn1/zgrid/themes/10411/images/feature-pizza.jpg' },
        { id: 3, name: 'Burritos', description: 'Carne asada for dayz', url: 'https://1.bp.blogspot.com/_1wWTObAexYs/STkUe4a2pAI/AAAAAAAAC0s/2tovJkKflsw/s400/la+puerta+carne+asada+burritos.JPG' },
      ],
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Tabs activeKey={this.state.activeKey} onSelect={this.handleSelect} id="uncontrolled-tab">
            <Tab eventKey="1" title="Da Most Recommended">
              <Row>
                <ListThumbnails list={this.state.displayPictures} />
              </Row>
            </Tab>
            <Tab eventKey="2" title="Da Quickest">
              <Row>
                <ListThumbnails list={this.state.displayPictures} />
              </Row>
            </Tab>
            <Tab eventKey="3" title="Da Most Viewed">
              <Row>
                <ListThumbnails list={this.state.displayPictures} />
              </Row>
            </Tab>
            <Tab eventKey="4" title="Da Staff Favorites">
              <Row>
                <ListThumbnails list={this.state.displayPictures} />
              </Row>
            </Tab>
          </Tabs>
        </Row>
      </div>
    );
  }
}

export default NavFilterThumbnails;
