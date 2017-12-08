import React from 'react';
import axios from 'axios';
import { ProgressBar, Image, Button, Form, FormGroup, ControlLabel, FormControl, Row, Col } from 'react-bootstrap';
import uploadImage from '../../utils/uploadImage';
import { numsOnly, validChars, validateChars, validateNums, trimFirstSpace } from '../../utils/formValidation';

class RecipeSubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calories: '',
      fat: '',
      ingredients: '',
      imageURL: 'https://dtfkajhqu1nl.cloudfront.net/edb/img/placeholders/placeholder-default.jpg',
      minutes: '',
      name: '',
      optionalTips: '',
      portions: '',
      preparationDirections: '',
      protein: '',
      recipeHistory: '',
      uploadProgress: 0,
      uploadState: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  setUpload(ref) {
    this.imageUpload = ref;
  }

  handleImageChange(event) {
    if (event.target.files[0]) {
      [this.uploadImage] = event.target.files;
      this.setState({
        uploadState: 'ready',
      });
    }
  }

  handleImageUpload() {
    const fileName = this.uploadImage.name;
    const file = this.uploadImage;
    console.log(fileName, file, this);
    // const imgUpload = uploadImage.bind(this);
    uploadImage('recipe', fileName, file, this, (dlUrl) => {
      const imgInput = { name: 'imageURL', value: dlUrl };
      this.handleInputChange({ target: imgInput });
    });
  }

  handleRecipeSubmit(e) {
    e.preventDefault();
    // Check for valid entry fields
    const { name, calories, fat, minutes, imageURL, portions, recipeHistory } = this.state;
    let { ingredients, preparationDirections, optionalTips } = this.state;
    let warning = '';
    if (name === '' || validChars(name)) {
      warning += ('<h4>Name is not valid</h4>');
    } if (calories === '' || numsOnly(calories)) {
      warning += ('<h4>Calories is not valid</h4>');
    } if (fat === '' || numsOnly(fat)) {
      warning += ('<h4>Fat is not valid</h4>');
    } if (minutes === '' || numsOnly(minutes)) {
      warning += ('<h4>Minutes is not valid</h4>');
    } if (portions === '' || numsOnly(portions)) {
      warning += ('<h4>Portions is not valid</h4>');
    } if (recipeHistory === '' || validChars(recipeHistory)) {
      warning += ('<h4>Recipe history is not valid</h4>');
    } if (imageURL === 'https://dtfkajhqu1nl.cloudfront.net/edb/img/placeholders/placeholder-default.jpg') {
      warning += ('<h4>Upload a valid picture with URL</h4>');
    } if (ingredients === '' || validChars(ingredients)) {
      warning += ('<h4>Ingredients not valid</h4>');
    } if (preparationDirections === '' || validChars(preparationDirections)) {
      warning += ('<h4>Preparation directions not valid</h4>');
    }
    const warningElement = document.getElementById('recipe-form-error');
    if (warning !== '') {
      warningElement.innerHTML = (warning);
      return;
    }

    // Success
    warningElement.innerHTML = ('');
    const stringsToSplit = [ingredients, preparationDirections, optionalTips];
    [ingredients, preparationDirections, optionalTips] = stringsToSplit.map((str) => {
      let result = str;
      result = result.split(',');
      result = trimFirstSpace(result);
      return result;
    });
    const recipe = { name, calories, fat, minutes, portions, recipeHistory, imageURL, ingredients, preparationDirections, optionalTips };
    console.log(recipe);
    // POST TO DB IF ALL PASS
    // axios.post('/api', recipe)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // Clear Form
    Object.keys(this.state).forEach((prop) => {
      if (prop === 'imageURL') {
        this.setState({
          imageURL: 'https://dtfkajhqu1nl.cloudfront.net/edb/img/placeholders/placeholder-default.jpg',
        });
      } else if (prop === 'uploadProgress') {
        this.setState({ uploadProgress: 0 });
      } else {
        this.setState({ [prop]: '' });
      }
    });
    warning += ('<h4>Thanks for the submission</h4>');
    warningElement.innerHTML = (warning);
    setTimeout(() => { warningElement.innerHTML = ''; }, 4000);
    console.log('Thanks for submission.');
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
                <Row>
                  <Col xs={4} xsOffset={3}>
                    <h4>Name of Recipe</h4>
                  </Col>
                </Row>
                <Row>
                  <Col xs={4} xsOffset={3}>
                    <FormGroup validationState={validateChars('name', this)}>
                      <FormControl
                        name="name"
                        onChange={this.handleInputChange}
                        placeholder="Name of Recipe"
                        type="text"
                        value={this.state.name}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2} xsOffset={4}>
                    <ControlLabel>Image of Recipe</ControlLabel>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2} xsOffset={4}>
                    <Image src={this.state.imageURL} alt={this.state.name} thumbnail />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs={2} xsOffset={2}>
                    <FormGroup validationState={validateChars('imageURL', this)}>
                      <ControlLabel>Upload Your Image</ControlLabel>
                      <FormControl
                        type="file"
                        accept="image/*"
                        onChange={this.handleImageChange}
                        ref={(ref) => { this.setUpload(ref); }}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={2} xsOffset={1}>
                    {(() => {
                      switch (this.state.uploadState) {
                        case 'ready':
                          return (
                            <div>
                              {/* <ControlLabel>Image Upload</ControlLabel> */}
                              <Button onClick={this.handleImageUpload}>
                                Upload
                              </Button>
                            </div>
                          );
                        case 'running':
                          return (
                            <div>
                              <ControlLabel>Image Upload</ControlLabel>
                              <ProgressBar
                                now={this.state.uploadProgress}
                                label={`${Math.round(this.state.uploadProgress)}%`}
                              />
                            </div>
                          );
                        case 'complete':
                          return (
                            <div>
                              <ControlLabel>Image URL</ControlLabel>
                              <FormControl
                                name="imageURL"
                                onChange={this.handleInputChange}
                                value={this.state.imageURL}
                                type="text"
                              />
                            </div>
                          );
                        default:
                          return (
                            <div>
                              {/* <ControlLabel>Image URL</ControlLabel> */}
                              <Button disabled>
                                Upload
                              </Button>
                            </div>
                          );
                      }
                    })()}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs={2} xsOffset={1}>
                    <FormGroup validationState={validateNums('minutes', this)}>
                      <ControlLabel>Time</ControlLabel>
                      <FormControl
                        name="minutes"
                        onChange={this.handleInputChange}
                        placeholder="How many minutes does it take?"
                        type="text"
                        value={this.state.minutes}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={2} xsOffset={2}>
                    <ControlLabel>Difficulty of Recipe</ControlLabel>
                    <FormControl componentClass="select" placeholder="Select Chef Master Level">
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </FormControl>
                  </Col>
                  <Col xs={2} xsOffset={2}>
                    <FormGroup validationState={validateNums('portions', this)}>
                      <ControlLabel>Portions</ControlLabel>
                      <FormControl
                        name="portions"
                        onChange={this.handleInputChange}
                        placeholder="How many portions will this make?"
                        type="text"
                        value={this.state.portions}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <br />
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs={10} xsOffset={1}>
                    <FormGroup validationState={validateChars('recipeHistory', this)}>
                      <ControlLabel>History of Recipe</ControlLabel>
                      <FormControl
                        componentClass="textarea"
                        name="recipeHistory"
                        onChange={this.handleInputChange}
                        placeholder="Tell us about the history of your recipe"
                        value={this.state.recipeHistory}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs={6} xsOffset={4}>
                    <ControlLabel>Enter the amount for each, per portion</ControlLabel>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs={2} xsOffset={1}>
                    <FormGroup validationState={validateNums('fat', this)}>
                      <ControlLabel>Fat (grams)</ControlLabel>
                      <FormControl
                        name="fat"
                        onChange={this.handleInputChange}
                        placeholder="Fat per portion"
                        type="text"
                        value={this.state.fat}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={2} xsOffset={1}>
                    <FormGroup validationState={validateNums('calories', this)}>
                      <ControlLabel>Calories</ControlLabel>
                      <FormControl
                        name="calories"
                        onChange={this.handleInputChange}
                        placeholder="Calories per portion"
                        type="text"
                        value={this.state.calories}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={2} xsOffset={1}>
                    <FormGroup validationState={validateNums('protein', this)}>
                      <ControlLabel>Protein (grams)</ControlLabel>
                      <FormControl
                        name="protein"
                        onChange={this.handleInputChange}
                        placeholder="Protein per portion"
                        type="text"
                        value={this.state.protein}
                      />
                    </FormGroup>
                  </Col>
                </Row>
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
                    placeholder="Comma-delineated steps (e.g. salt meat, slice tomatoes)"
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
                    placeholder="Comma-delineated tips \
                    (e.g. defrost for 2 hours, let sit for 20 minutes)"
                    value={this.state.optionalTips}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col xs={10} xsOffset={1}>
                    <div id="recipe-form-error" />
                  </Col>
                </Row>
                <Row>
                  <Col xs={2} xsOffset={5}>
                    <Button
                      type="submit"
                      className="btn-secondary"
                      onClick={(e) => { this.handleRecipeSubmit(e); }}
                    >Submit
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RecipeSubmissionForm;
