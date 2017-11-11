//  @flow
import React from 'react';

type Props = {
  market: Object,
}

class Market extends React.Component {

  props: Props

  render() {
    const market = this.props.market;
    return (
      <div>
        <h4>{market.exchange + ":" + market.pair + "   " + market.rate}</h4>
      </div>
    );
  }
}

export default Market;
