import React from 'react';
import BubbleChart from './BubbleChart';
import Bubbles from './Bubbles';
import GroupingPicker from './GroupingPicker';
import { createNodes } from './utils';
import { width, height, center } from './constants';
import data from '../testData/testRestaurants.json';
import './DataDisplay.css';

const processedData = [];

const processData = () => {
  data.forEach((entry) => {
    const rand = Math.floor(2 + (Math.random() * 10));
    const obj = {
      name: entry.name,
      value: rand,
    };
    processedData.push(obj);
  });
};

export default class DataDisplay extends React.Component {
  constructor(props) {
    super(props);
    processData();
    this.state = {
      data: createNodes(processedData),
      grouping: 'all',
    };
    this.onGroupingChanged = this.onGroupingChanged.bind(this);
  }

  onGroupingChanged(newGrouping) {
    this.setState({
      grouping: newGrouping,
    });
  }

  render() {
    return (
      <div>
        <GroupingPicker onChanged={this.onGroupingChanged} active={this.state.grouping} />
        <BubbleChart width={width} height={height}>
          <Bubbles data={this.state.data} forceStrength={0.03} center={center} />
        </BubbleChart>
      </div>
    );
  }
}
