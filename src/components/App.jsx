import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TestComponent from '../components/TestComponent';
import Home from '../components/Home';
import NavbarInstance from './NavbarInstance';
import ModalRoot from './ModalRoot';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <NavbarInstance showLoginModal={this.props.showLoginModal} />
            <ModalRoot modal={this.props.modal} hideModal={this.props.hideModal} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/test" component={TestComponent} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
App.propTypes = {
};

export default App;
