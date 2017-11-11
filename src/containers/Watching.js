//  @flow
import React from 'react';
import MarketList from './MarketList';

class Watching extends React.Component {
  render() {
    console.log('watching');
    return (
      <MarketList adding={false} />
    );
  }
}

export default Watching;
