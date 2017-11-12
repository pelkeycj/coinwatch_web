//  @flow
import React from 'react';
import MarketList from './MarketList';

class Watching extends React.Component {
  render() {
    return (
      <MarketList adding={false} />
    );
  }
}

export default Watching;
