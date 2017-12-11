import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap/lib';

class NavFilterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(eventKey) {
    this.setState({ activeTab: eventKey });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={3} />
            <Col xs={4}>
              <Nav bsStyle="tabs" activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                <NavItem eventKey="1">Da Ingredients</NavItem>
                <NavItem eventKey="2">Da Directions</NavItem>
              </Nav>
            </Col>
            <Col xs={3} />
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col xs={8}>
              {this.state.activeTab === '1' ?
              this.props.ingredients.map(ingredient => (<h5>{ingredient.name}<hr /></h5>))
              :
              this.props.directions.map(direction => (<h5>{direction.description}<hr /></h5>))
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

NavFilterDetails.propTypes = {
  directions: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
};

export default NavFilterDetails;
