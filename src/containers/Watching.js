//  @flow
import React from 'react';
import { connect } from 'react-redux';
import Market from '../components/Market';
import Navbar from './Navbar';
import { filterWatching } from '../utils/MarketUtils';

type Props = {
  isAuthenticated: boolean,
  currentUser: Object,
  market_data: Object,
  state: Object,
}


class Watching extends React.Component {

  props: Props

  render() {
    const { state, isAuthenticated, currentUser } = this.props;
    const market_data = state.channel.market_data;
    let bins;

    if (isAuthenticated) {
      bins = filterWatching(market_data, currentUser.markets);
    }

    return (
      <div>
        <Navbar />
        <h1>watching</h1>
        {bins && bins.watched &&
          bins.watched.map((market) => {
            return <Market market={market} />
          })}
      </div>
    )
  }
}

export default connect(
  state => ({
    state: state,
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
    market_data: state.channel.market_data,
  }),
  null,
)(Watching);
