import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import axios from 'axios';
import Home from './home/Home';
import RecipeHomePage from './recipe/RecipeHomePage';
import RecipeSubmissionForm from './recipe/RecipeSubmissionForm';
import NavbarInstance from './nav/NavbarInstance';
import ModalRoot from './modals/ModalRoot';
import RestaurantSubmissionForm from './restaurant/RestaurantSubmissionForm';
import UserProfile from './profile/UserProfile';
import RecipeDetailsPage from './recipe/RecipeDetailsPage';
import RestaurantHomePage from './restaurant/RestaurantHomePage';
import RestaurantDetailsPage from './restaurant/RestaurantDetailsPage';
import Trending from './posts/Trending';
import DataDisplay from './dataDisplay/DataDisplay';
import FooterInstance from './nav/FooterInstance';

axios.defaults.withCredentials = true;

const mapStyles = styles => (
  {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  }
);
// wrap the `spring` helper to use a bouncy config
const bounce = val => (
  spring(val, {
    stiffness: 330,
    damping: 22,
  })
);
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.findRestaurant = this.findRestaurant.bind(this);
    this.findRecipe = this.findRecipe.bind(this);
    this.findUser = this.findUser.bind(this);
    this.state = {
      tags: [],
    };
  }
  async componentWillMount() {
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
            /><br /><br /><br />
            <AnimatedSwitch
              atEnter={bounceTransition.atEnter}
              atLeave={bounceTransition.atLeave}
              atActive={bounceTransition.atActive}
              mapStyles={mapStyles}
              className="route-wrapper"
            >
              <Route
                exact
                path="/"
                render={() => (<Home
                  {...this.props}
                />)}
              />
              <Route
                exact
                path="/trending/tag/:name"
                render={props => (
                  <Trending
                    {...this.props}
                    name={props.match.params.name}
                  />
                )}
              />
              <Route
                exact
                path="/restaurants-home"
                render={() => (<RestaurantHomePage
                  {...this.props}
                />)}
              />
              <Route
                exact
                path="/restaurant-submission"
                render={() => (<RestaurantSubmissionForm
                  {...this.props}
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
                render={() => (<RecipeSubmissionForm
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
              <Route
                exact
                path="/data"
                render={() => (
                  <DataDisplay {...this.props} tags={this.state.tags} />
                )}
              />
            </AnimatedSwitch>
            <FooterInstance />
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
