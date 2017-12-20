import React from 'react';
import { Nav, Navbar, NavItem, InputGroup, DropdownButton, NavDropdown, MenuItem } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import HasLoggedIn from './hasLoggedIn';
import NavSearch from './search';

class NavbarInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: 'Tags',
    };
    this.searchTypes = [
      'Tags',
      'Recipes',
      'Restaurants',
    ];
  }
  changePage(toPage) {
    if (toPage === 'profile') {
      if (this.props.auth.displayName !== 'guest') {
        this.props.history.push({
          pathname: `/profile/${this.props.auth.displayName}`,
          state: { id: null },
        });
      }
    } else if (toPage === 'recipe') {
      this.props.history.push({
        pathname: `/recipe/${this.props.app.curRecipe.name}/${this.props.app.curRecipe.id}`,
        state: { id: null },
      });
    } else if (toPage === 'restaurant') {
      this.props.history.push({
        pathname: `/restaurant/${this.props.app.curRestaurant.name}/${this.props.app.curRestaurant.id}`,
        state: { id: null },
      });
    } else {
      this.props.history.push(`/${toPage}`);
    }
  }

  handleSearchOption(e) {
    console.log(e);
    this.setState({
      searchType: e,
    });
  }

  render() {
    return (
      <Navbar fluid inverse collapseOnSelect staticTop fixedTop>
        <Navbar.Header>
          <Navbar.Brand onClick={() => { this.changePage(''); }}>
            FoodEZ
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <InputGroup>
              <NavSearch
                searchType={this.state.searchType}
                eventKey={1}
                history={this.props.history}
              />
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title={this.state.searchType}
                onSelect={e => this.handleSearchOption(e)}
              >
                {this.searchTypes.map(type => (
                  <MenuItem eventKey={type} key={type}>{type}</MenuItem>
                ))}
              </DropdownButton>
            </InputGroup>
          </Navbar.Form>
          <Nav>
            <NavDropdown eventKey={1} title="Cooking At Home" id="recipe-dropdown">
              <MenuItem
                eventKey={1.1}
                onClick={() => { this.changePage('recipes-home'); }}
              >Recipes Home
              </MenuItem>
              <MenuItem
                eventKey={1.2}
                onClick={() => { this.changePage('recipe-submission'); }}
              >Recipe Submission
              </MenuItem>
              <MenuItem divider />
            </NavDropdown>
            <NavDropdown eventKey={2} title="Dining Out" id="recipe-dropdown">
              <MenuItem
                eventKey={2.1}
                onClick={() => { this.changePage('restaurants-home'); }}
              >Restaurants Home
              </MenuItem>
              <MenuItem
                eventKey={2.2}
                onClick={() => { this.changePage('restaurant-submission'); }}
              >Restaurant Submission
              </MenuItem>
              <MenuItem divider />
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem
              className="navbar-username"
              onClick={() => { this.changePage('profile'); }}
              eventKey={6}
            >{this.props.auth.displayName}
            </NavItem>
            <HasLoggedIn
              dispatch={this.props.dispatch}
              authStatus={this.props.auth.status}
              logoutUser={this.props.logoutUser}
              showLoginModal={this.props.showLoginModal}
              eventKey={7}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavbarInstance.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  showLoginModal: PropTypes.func.isRequired,
};

export default withRouter(NavbarInstance);
