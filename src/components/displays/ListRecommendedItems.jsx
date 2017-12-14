import React from 'react';
import PropTypes from 'prop-types';
import { Media, PageHeader } from 'react-bootstrap';

const SeasonalItems = props => (
  <div>
    <PageHeader>Seasonal Items <br />
      <small>Seasonal selections by your dev team</small>
    </PageHeader>
    {props.list.map(item => (
      <Media key={item.id}>
        <Media.Left align="top">
          <img width={64} height={64} src={item.image_url} alt={item.name} />
        </Media.Left>
        <Media.Body>
          <Media.Heading>{item.name}</Media.Heading>
          <p>{item.description}</p>
        </Media.Body>
      </Media>
      ))}
  </div>
);

SeasonalItems.propTypes = {
  list: PropTypes.array.isRequired,
};


export default SeasonalItems;
