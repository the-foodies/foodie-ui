import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { ProgressBar, Image, InputGroup, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Row, Col } from 'react-bootstrap';

import { googleAutocomplete, googleRestaurant } from '../utils/googleRestaurant';
import uploadImage from '../utils/uploadImage';

const filterByCallback = option => option.description;

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantSearch: {
        allowNew: false,
        isLoading: false,
        multiple: false,
        options: [],
      },
      restaurantSearchTerm: '',
      restaurantSubmission: {
        name: '',
        website: '',
        address: '',
        imageURL: '',
        categories: [],
        foodItems: [],
      },
      foodItem: {
        name: '',
        rating: '',
        description: '',
      },
      uploadProgress: 0,
      uploadState: '',
      imageURL: 'https://dtfkajhqu1nl.cloudfront.net/edb/img/placeholders/placeholder-default.jpg',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleFoodItemSubmit = this.handleFoodItemSubmit.bind(this);
    this.searchGoogleForRestaurant = this.searchGoogleForRestaurant.bind(this);
    this.searchGoogleAutocomplete = this.searchGoogleAutocomplete.bind(this);
  }

  setUpload(ref) {
    this.imageUpload = ref;
  }

  handleImageChange(event) {
    if (event.target.files[0]) {
      console.log('hello plz', event.target.files[0]);
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
    uploadImage('restaurant', fileName, file, this, (dlUrl) => {
      const imgInput = { name: 'imageURL', value: dlUrl };
      this.handleInputChange({ target: imgInput }, 'restaurantSubmission');
    });
  }

  handleFoodItemSubmit(e) {
    const { foodItem } = this.state;
    const { foodItems, categories } = this.state.restaurantSubmission;
    // foodItems.push(food)
    if (foodItems) {
      this.setState(prevState => ({
        restaurantSubmission: {
          ...prevState.restaurantSubmission,
          foodItems: [...foodItems, foodItem],
          categories: [...categories, foodItem.name],
        },
        foodItem: {
          name: '',
          rating: '',
          description: '',
        },
      }));
    }
    e.preventDefault();
  }
  handleRestaurantSubmit(e) {
    console.log(this.state.restaurantSubmission, this.state.restaurantSubmission.foodItems);
    e.preventDefault();
  }
  handleInputChange(e, type) {
    const { name } = e.target;
    let { value } = e.target;
    if (name === 'rating' && value > 5) {
      value = 5;
    }
    this.setState(prevState => ({
      [type]: {
        ...prevState[type],
        [name]: value,
      },
    }));
  }

  searchGoogleForRestaurant(e) {
    googleRestaurant(this.state.restaurantSearchTerm).then((place) => {
      // place returns false if bad query
      if (place) {
        const submission = {
          name: place.name,
          website: place.website,
          address: place.formatted_address,
        };
        this.setState(prevState => ({
          restaurantSubmission: {
            ...prevState.restaurantSubmission,
            ...submission,
          },
        }));
      }
    });
    e.preventDefault();
  }

  searchGoogleAutocomplete(query) {
    const restSearch = { ...this.state.restaurantSearch };
    restSearch.isLoading = true;
    this.setState(prevState => ({
      restaurantSearch: {
        ...prevState.restaurantSearch,
        isLoading: true,
      },
    }));
    // console.log(google);
    googleAutocomplete(query).then((options) => {
      restSearch.isLoading = false;
      restSearch.options = options;
      this.setState({ restaurantSearch: restSearch });
    });
  }

  render() {
    return (
      <div>
        <FormGroup>
          <Col xs={12}>
            <h4>Restaurant Search</h4>
          </Col>
        </FormGroup>
        <Row>
          <Col xs={12}>
            <Form onSubmit={(e) => { this.searchGoogleForRestaurant(e); }}>
              <Col xs={12}>
                <InputGroup>
                  <AsyncTypeahead
                    {...this.state.restaurantSearch}
                    filterBy={filterByCallback}
                    labelKey="description"
                    minLength={1}
                    onSearch={this.searchGoogleAutocomplete}
                    onChange={
                      (selected) => { this.setState({ restaurantSearchTerm: selected[0] }); }
                    }
                    placeHolder="Search for a restaurant"
                    renderMenuItemChildren={option => (
                      <div>{option.description}</div>
                    )}
                  />
                  <InputGroup.Button>
                    <Button
                      className="btn-secondary"
                      type="submit"
                      onClick={(e) => { this.searchGoogleForRestaurant(e); }}
                    >Submit
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
                <HelpBlock>Input a restaurant to populate its data</HelpBlock>
              </Col>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Form>
              <FormGroup>
                <Col xs={12}>
                  <h4>Restaurant Info</h4>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={6}>
                  <ControlLabel>Restaurant Name</ControlLabel>
                  <FormControl
                    name="name"
                    onChange={(e) => { this.handleInputChange(e, 'restaurantSubmission'); }}
                    value={this.state.restaurantSubmission.name}
                    type="text"
                  />
                  <ControlLabel>Website</ControlLabel>
                  <FormControl
                    name="website"
                    onChange={(e) => { this.handleInputChange(e, 'restaurantSubmission'); }}
                    value={this.state.restaurantSubmission.website}
                    type="text"
                  />
                  <ControlLabel>Restaurant Address</ControlLabel>
                  <FormControl
                    name="address"
                    onChange={(e) => { this.handleInputChange(e, 'restaurantSubmission'); }}
                    value={this.state.restaurantSubmission.address}
                    type="text"
                  />
                  <FormGroup>
                    <Col xs={6}>
                      <ControlLabel>Upload Your Image</ControlLabel>
                      <FormControl
                        type="file"
                        accept="image/*"
                        onChange={this.handleImageChange}
                        ref={(ref) => { this.setUpload(ref); }}
                      />
                    </Col>
                    <Col xs={6}>
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
                                  onChange={(e) => { this.handleInputChange(e, 'restaurantSubmission'); }}
                                  value={this.state.restaurantSubmission.imageURL}
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
                  </FormGroup>
                </Col>
                <Col xsOffset={1} xs={3}>
                  <Image src={this.state.imageURL} thumbnail />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={12}>
                  <h4>Menu Review</h4>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={10}>
                  <ControlLabel>Menu Item</ControlLabel>
                  <FormControl
                    name="name"
                    onChange={(e) => { this.handleInputChange(e, 'foodItem'); }}
                    value={this.state.foodItem.name}
                    type="text"
                  />
                </Col>
                <Col xs={2}>
                  <ControlLabel>Rate It</ControlLabel>
                  <FormControl
                    name="rating"
                    min="1"
                    max="5"
                    onChange={(e) => { this.handleInputChange(e, 'foodItem'); }}
                    value={this.state.foodItem.rating}
                    type="number"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={12}>
                  <ControlLabel>Your Review</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name="description"
                    onChange={(e) => { this.handleInputChange(e, 'foodItem'); }}
                    value={this.state.foodItem.description}
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={4} xsOffset={8}>
                  <Button
                    className="btn-secondary"
                    onClick={(e) => { this.handleFoodItemSubmit(e); }}
                  >Add Food item
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={12}>
                  <Button
                    className="btn-secondary"
                    onClick={(e) => { this.handleRestaurantSubmit(e); }}
                  >Submit Restaurant
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

export default Restaurant;
