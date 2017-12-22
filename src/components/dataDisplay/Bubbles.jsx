import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { fillColor } from './utils';
import tooltip from './Tooltip';

export function showDetail(d) {
  d3.select(this).attr('stroke', 'black');

  const content = `<span class="name">Tag: </span><span class="value">${
    d.tag
  }</span><br/>` +
    `<span class="name">Number of Mentions: </span><span class="value">${
      d.numMentions
    }</span>`;

  tooltip.showTooltip(content, d3.event);
}

export function hideDetail() {
  d3.select(this)
    .attr('stroke', 'grey');
  tooltip.hideTooltip();
}

export default class Bubbles extends React.Component {
  constructor(props) {
    super(props);
    const { forceStrength, center } = props;
    this.state = {
      g: null,
    };
    this.simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      .force('charge', d3.forceManyBody().strength(this.charge.bind(this)))
      .on('tick', this.ticked.bind(this))
      .stop();
    this.onRef = this.onRef.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.renderBubbles(nextProps.data);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  onRef(ref) {
    this.setState({ g: d3.select(ref) }, () => this.renderBubbles(this.props.data));
  }

  ticked() {
    this.state.g.selectAll('.bubble')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('x', d => d.x)
      .attr('y', d => d.y);
  }

  charge(d) {
    return -this.props.forceStrength * (d.radius ** 2.0);
  }

  regroupBubbles() {
    const { forceStrength, center } = this.props;
    this.simulation.force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y));
    this.simulation.alpha(1).restart();
  }

  renderBubbles(data) {
    d3.json(data, () => {
      const bubbles = this.state.g.selectAll('g .bubble')
        .data(data, d => d.id)
        .enter()
        .append('g')
        .attr('class', 'bubble');

      const circles = bubbles.append('circle')
        .classed('bubble', true)
        .attr('r', 0)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('fill', d => (d.type === 'recipe' ? 'red' : 'green'))
        .attr('stroke', 'grey')
        .attr('stroke-width', 2)
        .on('mouseover', showDetail)
        .on('mouseout', hideDetail)
        .on('click', (d) => {
          tooltip.hideTooltip();
          this.props.changePage(d.tag);
        });

      bubbles.append('text')
        .classed('bubble', true)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('text-anchor', 'middle')
        .text(d => (d.numMentions > 5 ? d.tag : ''));

      circles.transition().duration(1000).attr('r', d => d.radius).on('end', () => {
        this.simulation.nodes(data)
          .alpha(1)
          .restart();
      });
    });
  }

  render() {
    return (
      <g ref={this.onRef} onClick={this.onClick} className="bubbles" />
    );
  }
}

Bubbles.propTypes = {
  center: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  forceStrength: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    numMentions: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
  })).isRequired,
  changePage: PropTypes.func.isRequired,
};
