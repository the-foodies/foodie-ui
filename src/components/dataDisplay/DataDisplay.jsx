import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import BubbleChart from './BubbleChart';
import Bubbles from './Bubbles';
import GroupingPicker from './GroupingPicker';
import { createNodes } from './utils';
import { width, height, center } from './constants';
import './DataDisplay.css';

const REST_URL = process.env.REST_URL || 'http://localhost:4420';

class DataDisplay extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      data: [],
      grouping: 'all',
    };
    this.onGroupingChanged = this.onGroupingChanged.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  async componentWillMount() {
    const tags = await axios.get(`${REST_URL}/trending/d3`);
    this.setState({
      data: createNodes(tags.data),
    });
  }

  onGroupingChanged(newGrouping) {
    this.setState({
      grouping: newGrouping,
    });
  }

  changePage(tag) {
    this.props.history.push({
      pathname: `/trending/tag/${encodeURIComponent(tag)}`,
    });
  }

  render() {
    return (
      <div>
        <GroupingPicker onChanged={this.onGroupingChanged} active={this.state.grouping} />
        <BubbleChart width={width} height={height}>
          <Bubbles data={this.state.data} forceStrength={0.03} center={center} changePage={this.changePage} />
        </BubbleChart>
      </div>
    );
  }
}

DataDisplay.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(DataDisplay);
