import React from 'react';
import PropTypes from 'prop-types';
import './GroupingPicker.css';

export default class GroupingPicker extends React.Component {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  onBtnClick(event) {
    this.props.onChanged(event.target.name);
  }

  render() {
    const { active } = this.props;
    return (
      <div className="GroupingPicker">
        <button className={`button ${active === 'all' && 'active'}`} name="all" onClick={this.onBtnClick}>Most Popular Tags</button>
      </div>
    );
  }
}

GroupingPicker.propTypes = {
  onChanged: PropTypes.func.isRequired,
  active: PropTypes.oneOf(['all']).isRequired,
};
