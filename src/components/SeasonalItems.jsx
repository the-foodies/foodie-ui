import React from 'react';
import { Media, PageHeader } from 'react-bootstrap';

const SeasonalItems = ({ list }) => {
  return (
    <div>
      <PageHeader>Seasonal Items <br />
        <small>Seasonal selections by your dev team</small>
      </PageHeader>
      {list.map((item) => {
        return (
          <Media key={item.id}>
            <Media.Left align="top">
              <img width={64} height={64} src={item.url} alt={item.name} />
            </Media.Left>
            <Media.Body>
              <Media.Heading>{item.name}</Media.Heading>
              <p>{item.description}</p>
            </Media.Body>
          </Media>
        );
      })}
    </div>
  );
};

export default SeasonalItems;
