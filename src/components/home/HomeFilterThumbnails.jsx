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
        <Row className="details-dashed-border details-page">
          <Tabs activeKey={this.state.activeKey} onSelect={this.handleSelect} id="uncontrolled-tab" justified>
            <Tab eventKey="1" title="Da Most Recommended">
              <ListThumbnails list={this.props.displayPictures.slice(0, 4)} />
            </Tab>
            <Tab eventKey="2" title="Da Quickest">
              <ListThumbnails list={this.props.displayPictures.slice(4, 8)} />
            </Tab>
            <Tab eventKey="3" title="Da Most Viewed">
              <ListThumbnails list={this.props.displayPictures.slice(8, 12)} />
            </Tab>
            <Tab eventKey="4" title="Da Staff Favorites">
              <ListThumbnails list={this.props.displayPictures.slice(12, 16)} />
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
