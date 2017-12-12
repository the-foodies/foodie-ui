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
import testUser from './testData/testUser.json';

axios.defaults.withCredentials = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log(this.props);

    this.findPost = this.findPost.bind(this);
  }
  componentWillMount() {
    this.props.dispatchAuth.listenToAuth();
    this.findPost(1);
  }
  findPost(id) {
    console.log('getting details for', id);
    this.props.dispatchApi.getRestaurantById(id);
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
                  getPost={this.findPost}
                />)}
              />
              <Route exact path="/recipes" component={RecipeHomePage} />
              <Route exact path="/recipe-submission" component={RecipeSubmissionForm} />
              <Route
                exact
                path="/recipe-details"
                render={props => (<RecipeDetailsPage
                  {...props}
                  ingredients={testRestaurants[0].Ingredients}
                  directions={testRestaurants[0].Directions}
                  name={testRestaurants[0].title}
                  testRestaurants={testRestaurants}
                  portions="10"
                  difficulty="Medium"
                  protein={testRestaurants[0].protein}
                  fat={testRestaurants[0].fat}
                  calories={testRestaurants[0].calories}
                  rating={testRestaurants[0].rating}
                  sodium={testRestaurants[0].sodium}
                  imagesRecipes={testRestaurants[0].ImagesRecipes}
                  tags={testRestaurants[0].Tags}
                  recipeHistory="Grandma made this recipe in the 80s."
                />)}
              />
              <Route
                exact
                path="/restaurant-details"
                render={props => (<RestaurantDetailsPage
                  {...props}
                  name={testRestaurants[4].name}
                  address={testRestaurants[4].address}
                  website={testRestaurants[4].website}
                  foodItems={testRestaurants[4].FoodItems}
                  images={testRestaurants[4].ImagesRestaurants}
                  tags={testRestaurants[4].Tags}
                  comments={testRestaurants[4].Comments}
                />)}
              />
              <Route
                exact
                path="/profile"
                render={props => (<UserProfile
                  {...props}
                  posts={testRestaurants}
                  displayName={testUser.displayName}
                  firstName={testUser.firstName}
                  lastName={testUser.lastName}
                  image={testUser.profileImageUrl}
                  email={testUser.email}
                />)}
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
