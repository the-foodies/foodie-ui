import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Label } from 'react-bootstrap';

const Tags = ({ tags, history }) => {
  const handleClick = (name) => {
    history.push({
      pathname: `/trending/tag/${encodeURIComponent(name)}`,
    });
  };
  return (
    <h4>
      {tags.map(tag => (
        <span className="tag-list" key={tag.id}>
          <Label onClick={() => handleClick(tag.name)} bsStyle="info">#{tag.name}</Label>
          {' '}
        </span>
        ))
      }
    </h4>
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(Tags);
