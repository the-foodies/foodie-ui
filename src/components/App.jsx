import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import RecipeHomePage from './recipe/RecipeHomePage';
import RecipeSubmissionForm from './recipe/RecipeSubmissionForm';
import NavbarInstance from './NavbarInstance';
import ModalRoot from './ModalRoot';
import Restaurant from './Restaurant';
import UserProfile from './profile/UserProfile';
import testRestaurants from './testData/testRestaurants.json';
import testUser from './testData/testUser.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log(this.props);
  }
  componentWillMount() {
    this.props.dispatchAuth.listenToAuth();
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
              <Route exact path="/eating" component={Restaurant} />
              <Route exact path="/recipes" component={RecipeHomePage} />
              <Route exact path="/recipe-submission" component={RecipeSubmissionForm} />
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
};

export default App;
