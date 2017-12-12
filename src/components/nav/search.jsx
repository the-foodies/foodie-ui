import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import * as axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagSearch: {
        allowNew: false,
        isLoading: false,
        multiple: false,
      },
      searchTerm: '',
      tags: [],
    };
    this.foundPostNames = {};
    this.searchFoodieDB = this.searchFoodieDB.bind(this);
    this.filterByCallback = this.filterByCallback.bind(this)
  }

  filterByCallback(searchResult) {
    console.log(searchResult);
    return true;
  }

  async searchFoodieDB(query) {
    this.setState(prevState => ({
      tagSearch: {
        ...prevState.tagSearch,
        isLoading: true,
      }
    }));
    const search = await axios.get(`http://localhost:4420/search?query=${query}`);
    this.setState(prevState => ({
      tagSearch: {
        ...prevState.tagSearch,
        isLoading: false,
      },
      tags: search.data,
    }));
  }

  changeSelection(selected) {
    console.log(selected);
    // make api call to get '/type' by id
  }

  render() {
    return (
      <div>
        <AsyncTypeahead
          {...this.state.tagSearch}
          options={this.state.tags}
          filterBy={this.filterByCallback}
          labelKey="name"
          minLength={1}
          onSearch={this.searchFoodieDB}
          onChange={this.changeSelection}
          type="text"
          className="navbar-search"
          placeholder="Search for a some food!"
        />
      </div>
    );
  }
}

export default Search;
