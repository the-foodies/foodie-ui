import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Home from './home/Home';
import RecipeHomePage from './recipe/RecipeHomePage';
import RecipeSubmissionForm from './recipe/RecipeSubmissionForm';
import NavbarInstance from './nav/NavbarInstance';
import ModalRoot from './modals/ModalRoot';
import RestaurantSubmissionForm from './restaurant/RestaurantSubmissionForm';
import UserProfile from './profile/UserProfile';
import RecipeDetailsPage from './recipe/RecipeDetailsPage';
import RestaurantDetailsPage from './restaurant/RestaurantDetailsPage';
import testRestaurants from './testData/testRestaurants.json';

axios.defaults.withCredentials = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.findRestaurant = this.findRestaurant.bind(this);
    this.findRecipe = this.findRecipe.bind(this);
    this.findUser = this.findUser.bind(this);
  }
  componentWillMount() {
    this.props.dispatchAuth.listenToAuth();
  }
  findRestaurant(id) {
    this.props.dispatchApi.getRestaurantById(id);
  }
  findRecipe(id) {
    this.props.dispatchApi.getRecipeById(id);
  }
  findUser(id) {
    this.props.dispatchApi.getUserById(id);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <NavbarInstance
              dispatch={this.props.dispatch}
              auth={this.props.auth}
              logoutUser={this.props.dispatchAuth.logoutUser}
              showLoginModal={this.props.dispatchModal.showLoginModal}
            />
            <ModalRoot
              modal={this.props.modal}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/eating"
                render={props => (<RestaurantSubmissionForm
                  {...props}
                  getRestaurant={this.findRestaurant}
                />)}
              />
              <Route exact path="/recipes" component={RecipeHomePage} />
              <Route
                exact
                path="/recipe-submission"
                render={props => (<RecipeSubmissionForm
                  {...props}
                  getRecipe={this.findRecipe}
                />)}
              />
              <Route
                exact
                path="/recipe-details"
                render={props => (<RecipeDetailsPage
                  {...props}
                  id={testRestaurants[1].id}
                  ingredients={testRestaurants[1].Ingredients}
                  directions={testRestaurants[1].Directions}
                  name={testRestaurants[1].name}
                  portions="10"
                  difficulty="Medium"
                  protein={testRestaurants[1].protein}
                  fat={testRestaurants[1].fat}
                  calories={testRestaurants[1].calories}
                  rating={testRestaurants[1].rating}
                  sodium={testRestaurants[1].sodium}
                  imagesRecipes={testRestaurants[1].ImagesRecipes}
                  tags={testRestaurants[1].Tags}
                  recipeHistory="Grandma made this recipe in the 80s."
                />)}
              />
              <Route
                exact
                path="/restaurant-details"
                render={props => (<RestaurantDetailsPage
                  {...props}
                  id={testRestaurants[2].id}
                  name={testRestaurants[2].name}
                  address={testRestaurants[2].address}
                  website={testRestaurants[2].website}
                  foodItems={testRestaurants[2].FoodItems}
                  images={testRestaurants[2].ImagesRestaurants}
                  tags={testRestaurants[2].Tags}
                  comments={testRestaurants[2].Comments}
                />)}
              />
              <Route
                exact
                path="/profile/:displayName"
                render={({ location, match }) => (
                  <UserProfile
                    {...this.props}
                    id={location.state.id}
                    displayName={match.params.displayName}
                  />
                )}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  dispatchAuth: PropTypes.objectOf(PropTypes.func).isRequired,
  dispatchModal: PropTypes.objectOf(PropTypes.func).isRequired,
  dispatchApi: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default App;
