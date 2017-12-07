import React from 'react';
import { InputGroup, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Row, Col, FieldGroup } from 'react-bootstrap';

class RecipeSubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calories: '',
      fat: '',
      ingredients: '',
      minutes: '',
      optionalTips: '',
      portions: '',
      preparationDirections: '',
      protein: '',
      recipeHistory: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(`name ${e.target.name} value ${e.target.value}`);
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Form>
              <FormGroup>
                <Col xs={12}>
                  <h4>Upload Recipes and Share Them with Da Foodies All Over the World</h4>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={2} xsOffset={1}>
                  <ControlLabel>Time</ControlLabel>
                  <FormControl
                    name="minutes"
                    onChange={this.handleInputChange}
                    placeholder="How many minutes does it take?"
                    type="text"
                    value={this.state.minutes}
                  />
                </Col>
                <Col xs={2} xsOffset={2}>
                  <ControlLabel>Difficulty of Recipe</ControlLabel>
                  <FormControl componentClass="select" placeholder="Select Chef Master Level">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="master-level">Master Level</option>
                  </FormControl>
                </Col>
                <Col xs={2} xsOffset={2}>
                  <ControlLabel>Portions</ControlLabel>
                  <FormControl
                    name="portions"
                    onChange={this.handleInputChange}
                    placeholder="How many portions will this make?"
                    type="text"
                    value={this.state.portions}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={2} xsOffset={1}>
                  <img height="125" src="http://www.iconhot.com/icon/png/south-park-1/256/cartman-normal.png" alt="Current User" />
                  <h5>{''}Current User</h5>
                </Col>
                <Col xs={6} xsOffset={1}>
                  <ControlLabel>History of Recipe</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name="recipeHistory"
                    onChange={this.handleInputChange}
                    placeholder="Tell us about the history of your recipe"
                    value={this.state.recipeHistory}
                  />
                  <br />
                  <Col xs={6} xsOffset={4}>
                    <ControlLabel>Enter the amount for each, per portion</ControlLabel>
                  </Col>
                  <br />
                  <br />
                  <Col xs={3} xsOffset={1}>
                    <ControlLabel>Fat</ControlLabel>
                    <FormControl
                      name="fat"
                      onChange={this.handleInputChange}
                      placeholder="Fat per portion"
                      type="text"
                      value={this.state.fat}
                    />
                  </Col>
                  <Col xs={3} xsOffset={1}>
                    <ControlLabel>Calories</ControlLabel>
                    <FormControl
                      name="calories"
                      onChange={this.handleInputChange}
                      placeholder="Calories per portion"
                      type="text"
                      value={this.state.calories}
                    />
                  </Col>
                  <Col xs={3} xsOffset={1}>
                    <ControlLabel>Protein</ControlLabel>
                    <FormControl
                      name="protein"
                      onChange={this.handleInputChange}
                      placeholder="Protein per portion"
                      type="text"
                      value={this.state.protein}
                    />
                  </Col>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={10} xsOffset={1}>
                  <ControlLabel>Ingredients</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name="ingredients"
                    onChange={this.handleInputChange}
                    placeholder="Comma-delineated ingredients (e.g. two onions, two tomatoes, salt)"
                    value={this.state.ingredients}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={10} xsOffset={1}>
                  <ControlLabel>Steps for Preparation</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name="preparationDirections"
                    onChange={this.handleInputChange}
                    placeholder="Separate line entries (e.g. salt meat, slice tomatoes)"
                    value={this.state.preparationDirections}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={10} xsOffset={1}>
                  <ControlLabel>Optional Tips</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name="optionalTips"
                    onChange={this.handleInputChange}
                    placeholder="Separate line entries (e.g. defrost for 2 hours)"
                    value={this.state.optionalTips}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={2} xsOffset={5}>
                  <Button type="submit">
                    Submit
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RecipeSubmissionForm;
