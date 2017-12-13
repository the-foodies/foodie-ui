import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import RecipeHomePage from './recipe/RecipeHomePage';
import RecipeSubmissionForm from './recipe/RecipeSubmissionForm';
import NavbarInstance from './NavbarInstance';
import ModalRoot from './ModalRoot';
import Restaurant from './Restaurant';
import UserProfile from './profile/UserProfile';
import RecipeDetailsPage from './RecipeDetailsPage';
import RestaurantDetailsPage from './RestaurantDetailsPage';
import testRestaurants from './testData/testRestaurants.json';

axios.defaults.withCredentials = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log(this.props);

    this.findRestaurant = this.findRestaurant.bind(this);
    this.findRecipe = this.findRecipe.bind(this);
    this.findUser = this.findUser.bind(this);
  }
  componentWillMount() {
    this.props.dispatchAuth.listenToAuth();
<<<<<<< HEAD
=======
    this.findRestaurant(4);
    this.findRecipe(0);
>>>>>>> [feat]
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
                render={props => (<Restaurant
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
                  id={this.props.curRecipe.id}
                  ingredients={this.props.curRecipe.Ingredients}
                  directions={this.props.curRecipe.Directions}
                  name={this.props.curRecipe.title}
                  testRestaurants={testRestaurants}
                  portions="10"
                  difficulty="Medium"
                  protein={this.props.curRecipe.protein}
                  fat={this.props.curRecipe.fat}
                  calories={this.props.curRecipe.calories}
                  rating={this.props.curRecipe.rating}
                  sodium={this.props.curRecipe.sodium}
                  imagesRecipes={this.props.curRecipe.ImagesRecipes}
                  tags={this.props.curRecipe.Tags}
                  recipeHistory="Grandma made this recipe in the 80s."
                />)}
              />
              <Route
                exact
                path="/restaurant-details"
                render={props => (<RestaurantDetailsPage
                  {...props}
                  id={this.props.curRestaurant.id}
                  name={this.props.curRestaurant.name}
                  address={this.props.curRestaurant.address}
                  website={this.props.curRestaurant.website}
                  foodItems={this.props.curRestaurant.FoodItems}
                  images={this.props.curRestaurant.ImagesRestaurants}
                  tags={this.props.curRestaurant.Tags}
                  comments={this.props.curRestaurant.Comments}
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
  curRecipe: PropTypes.object.isRequired,
  curRestaurant: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  dispatchAuth: PropTypes.objectOf(PropTypes.func).isRequired,
  dispatchModal: PropTypes.objectOf(PropTypes.func).isRequired,
  dispatchApi: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default App;
