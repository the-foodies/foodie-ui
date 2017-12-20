import React from 'react';
import topojson from 'topojson';
import { MapBubble } from 'react-d3-map-bubble';
import data from '../testData/testRestaurants.json';

import css from '../testData/bubble.css';
import us from '../testData/us.json';

const processedData = [];

const processData = () => {
  data.forEach((entry) => {
    const rand = Math.floor(2 + (Math.random() * 10));
    const obj = {
      label: entry.name,
      value: rand,
    };
    processedData.push(obj);
  });
  console.log(processedData);
};

const DataDisplay = () => {
  processData();
  const dataStates = topojson.mesh(us, us.objects.states, ((a, b) => a !== b));
  const dataCounties = topojson.feature(us, us.objects.nation);
  const domain = {
    scale: 'sqrt',
    domain: [0, 1e6],
    range: [0, 15],
  };
  const circles = topojson.feature(us, us.objects.counties).features
    .sort((a, b) => b.properties.populaton - a.properties.populaton);
  const circleValue = d => +d.properties;
  const projection = 'null';
  return (<BarChart data={processedData} width={400} height={400} fill="#3182bd" title="Restaurant Data" />);
};

export default DataDisplay;
