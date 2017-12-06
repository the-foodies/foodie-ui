import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { InputGroup, Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Row, Col } from 'react-bootstrap';

import { googleAutocomplete, googleRestaurant } from '../utils/googleRestaurant';

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
    };


    this.handleInputChange = this.handleInputChange.bind(this);
    this.searchGoogleForRestaurant = this.searchGoogleForRestaurant.bind(this);
    this.searchGoogleAutocomplete = this.searchGoogleAutocomplete.bind(this);
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
          <Col xs={12}>
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
                </Col>
                <Col xs={6}>
                  <ControlLabel>Website</ControlLabel>
                  <FormControl
                    name="website"
                    onChange={(e) => { this.handleInputChange(e, 'restaurantSubmission'); }}
                    value={this.state.restaurantSubmission.website}
                    type="text"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={6}>
                  <ControlLabel>Restaurant Address</ControlLabel>
                  <FormControl
                    name="address"
                    onChange={(e) => { this.handleInputChange(e, 'restaurantSubmission'); }}
                    value={this.state.restaurantSubmission.address}
                    type="text"
                  />
                </Col>
                <Col xs={6}>
                  <ControlLabel>Image URL</ControlLabel>
                  <FormControl
                    name="imageURL"
                    onChange={(e) => { this.handleInputChange(e, 'restaurantSubmission'); }}
                    value={this.state.restaurantSubmission.imageURL}
                    type="text"
                  />
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
