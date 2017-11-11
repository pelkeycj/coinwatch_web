//  @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Market from '../components/Market';
import Navbar from './Navbar';
import { filterWatching } from '../utils/MarketUtils';

type Props = {
  isAuthenticated: boolean,
  currentUser: Object,
  market_data: Object,
  state: Object,
  adding: boolean,
}


class Watching extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.adding);
  }

  props: Props

  render() {
    const { state, isAuthenticated, currentUser, adding } = this.props;
    const market_data = state.channel.market_data;
    let header;
    let bins;
    let data;

    if (isAuthenticated) {
      bins = filterWatching(market_data, currentUser.markets);
    }
    if (!adding) {
      header = 'Watched Markets';
      if (isAuthenticated && bins) {
        data = bins.watched;
      }
    } else {
      header = 'Watch New Markets';
      if (isAuthenticated && bins) {
        data = bins.unwatched;
      }
    }


    return (
      <div>
        <Navbar />
        <h1>{header}</h1>
        {!adding &&
          <Link to="/watching/new">add</Link>
        }
        {bins && data &&
          data.map((market) => {
            return <Market market={market} adding={adding} key={market.id.toString()} />
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
