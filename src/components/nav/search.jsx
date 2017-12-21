import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import PropTypes from 'prop-types';
import * as axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultSearch: {
        allowNew: false,
        isLoading: false,
        multiple: false,
      },
      searchTerm: '',
      results: [],
    };
    this.foundPostNames = {};
    this.searchFoodieDB = this.searchFoodieDB.bind(this);
    this.filterByCallback = this.filterByCallback.bind(this);
    this.changeSelection = this.changeSelection.bind(this);
  }

  filterByCallback(searchResult) {
    if (searchResult.name !== undefined) {
      return true;
    }
    return false;
  }

  async searchFoodieDB(query) {
    this.setState(prevState => ({
      resultSearch: {
        ...prevState.resultSearch,
        isLoading: true,
      },
    }));
    const searchType = this.props.searchType.toLowerCase();
    const search = await axios.get(`http://localhost:4420/search/${searchType}?query=${query}`);
    this.setState(prevState => ({
      resultSearch: {
        ...prevState.resultSearch,
        isLoading: false,
      },
      results: search.data,
    }));
  }

  changeSelection(selected) {
    const selectedItem = selected[0];
    // make api call to get '/type' by id
    if (selectedItem) {
      if (this.props.searchType === 'Tags') {
        this.props.history.push({
          pathname: `/trending/tag/${encodeURIComponent(selectedItem.tag)}`,
        });
      } else {
        this.props.history.push({
          pathname: `/${selectedItem.type}/${selectedItem.name}/${selectedItem.id}`,
        });
      }
    }
  }

  render() {
    return (
      <div>
        <AsyncTypeahead
          {...this.state.resultSearch}
          options={this.state.results}
          filterBy={this.filterByCallback}
          labelKey={this.props.searchType === 'Tags' ? 'tag' : 'name'}
          minLength={1}
          onSearch={this.searchFoodieDB}
          onChange={this.changeSelection}
          type="text"
          placeholder="Search for a some food!"
          useCache={false}
        />
      </div>
    );
  }
}

Search.propTypes = {
  searchType: PropTypes.string.isRequired,
};

export default Search;
