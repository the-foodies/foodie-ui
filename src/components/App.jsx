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

axios.defaults.withCredentials = true;

class App extends React.Component {
  constructor(props) {
    super(props);
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
              app={this.props.app}
              dispatch={this.props.dispatch}
              auth={this.props.auth}
              logoutUser={this.props.dispatchAuth.logoutUser}
              showLoginModal={this.props.dispatchModal.showLoginModal}
            />
            <ModalRoot
              modal={this.props.modal}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (<Home
                  {...this.props}
                  test={props}
                />)}
              />
              <Route
                exact
                path="/eating"
                render={props => (<RestaurantSubmissionForm
                  {...props}
                  getRestaurant={this.findRestaurant}
                />)}
              />
              <Route
                exact
                path="/recipes-home"
                render={() => (<RecipeHomePage
                  {...this.props}
                />)}
              />
              <Route
                exact
                path="/recipe-submission"
                render={props => (<RecipeSubmissionForm
                  {...this.props}
                  getRecipe={this.findRecipe}
                />)}
              />
              <Route
                exact
                path="/recipe/:name/:id"
                render={({ match }) => (<RecipeDetailsPage
                  {...this.props}
                  id={match.params.id}
                />)}
              />
              <Route
                exact
                path="/restaurant/:name/:id"
                render={({ match }) => (<RestaurantDetailsPage
                  {...this.props}
                  id={match.params.id}
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
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  dispatchAuth: PropTypes.objectOf(PropTypes.func).isRequired,
  dispatchModal: PropTypes.objectOf(PropTypes.func).isRequired,
  dispatchApi: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default App;
