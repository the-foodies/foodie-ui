import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resturants: [],
      recipes: [],
    };
  }

  render() {
    return (
      <div>
        <div>SEARCH RESULTS FOR</div>
        {this.state.resturants.map(place => (
          <div>
            <div> RESTURANT: {place} </div>
          </div>
        ))}
        {this.state.recipes.map(place => (
          <div>
            <div> RECIPE: {place} </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
