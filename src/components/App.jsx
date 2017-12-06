import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import NavbarInstance from './NavbarInstance';
import ModalRoot from './ModalRoot';
import Restaurant from './Restaurant';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log(this.props);
  }
  componentWillMount() {
    this.props.listenToAuth();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <NavbarInstance
              dispatch={this.props.dispatch}
              auth={this.props.auth}
              logoutUser={this.props.logoutUser}
              showLoginModal={this.props.showLoginModal}
            />
            <ModalRoot
              dispatch={this.props.dispatch}
              auth={this.props.auth}
              openAuthWithProvider={this.props.openAuthWithProvider}
              openAuthWithEmail={this.props.openAuthWithEmail}
              openAuthSignup={this.props.openAuthSignup}
              modal={this.props.modal}
              hideModal={this.props.hideModal}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/eating" component={Restaurant} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  listenToAuth: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  showLoginModal: PropTypes.func.isRequired,
};

export default App;
