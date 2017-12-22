import React from 'react';
import { Row, Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ListThumbnails from '../displays/ListThumbnails';


class NavFilterThumbnails extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: '1',
    };
  }

  handleSelect(eventKey) {
    // eventKey.preventDefault();
    this.setState({
      activeKey: `${eventKey}`,
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Tabs activeKey={this.state.activeKey} onSelect={this.handleSelect} id="uncontrolled-tab">
            <Tab eventKey="1" title="Da Most Recommended">
              <Row>
                <ListThumbnails list={this.props.displayPictures.slice(0, 4)} />
              </Row>
            </Tab>
            <Tab eventKey="2" title="Da Quickest">
              <Row>
                <ListThumbnails list={this.props.displayPictures.slice(4, 8)} />
              </Row>
            </Tab>
            <Tab eventKey="3" title="Da Most Viewed">
              <Row>
                <ListThumbnails list={this.props.displayPictures.slice(8, 12)} />
              </Row>
            </Tab>
            <Tab eventKey="4" title="Da Staff Favorites">
              <Row>
                <ListThumbnails list={this.props.displayPictures.slice(12, 16)} />
              </Row>
            </Tab>
          </Tabs>
        </Row>
      </div>
    );
  }
}

NavFilterThumbnails.propTypes = {
  displayPictures: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NavFilterThumbnails;
