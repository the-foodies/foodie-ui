import React from 'react';
import { Nav, NavItem } from 'react-bootstrap/lib';


class NavFilterThumbnails extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      activeKey: '1',
    };
  }

  handleSelect(eventKey) {
    event.preventDefault();
    this.setState({
      activeKey: `${eventKey}`,
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
      </div>
    );
  }
}

export default NavFilterThumbnails;
