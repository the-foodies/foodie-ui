import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, ListGroup } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap/lib';

class RecipeFilterInstructions extends React.Component {
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
            <Col xs={6} xsOffset={3}>
              <Nav bsStyle="tabs" activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                <NavItem eventKey="1"><h3>Da Ingredients</h3></NavItem>
                <NavItem eventKey="2"><h3>Da Directions</h3></NavItem>
              </Nav>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <ListGroup className="post-list">
            <Col xs={10} className="recipe-dashed-border">
              {this.state.activeTab === '1' ?
              this.props.ingredients.map((ingredient, index) => (
                <h5 key={ingredient.id}># {index + 1}:   {ingredient.name}<hr /></h5>))
              :
              this.props.directions.map((direction, index) => (
                <h5 key={direction.id}>STEP {index + 1}: {direction.description}<hr /></h5>))
              }
            </Col>
          </ListGroup>
        </Grid>
      </div>
    );
  }
}

RecipeFilterInstructions.propTypes = {
  directions: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
};

export default RecipeFilterInstructions;
