import React from 'react';
import flavorTown from '../../assets/flavorTown.gif';

export default () => (
  <div className="loading-container">
    <div>
      <img src={flavorTown} alt="flavor town" />
    </div>
    <div>
      <h3>Taking you to Flavor Town...</h3>
    </div>
  </div>
);
