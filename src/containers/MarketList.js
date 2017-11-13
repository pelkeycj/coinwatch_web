//  @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Market from '../components/Market';
import Navigation from './Navigation';
import { filterWatching, sortByPair } from '../utils/MarketUtils';
import { addWatching, removeWatching } from '../actions/watching';

type Props = {
  addWatching: () => void,
  removeWatching: () => void,
  isAuthenticated: boolean,
  currentUser: Object,
  watched: Object,
  unwatched: Object,
  adding: boolean,
}


class Watching extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  props: Props

  handleSubmit(data) {
    if (this.props.adding) {
      this.props.addWatching(data);
    } else {
      this.props.removeWatching(data);
    }
    this.forceUpdate();
  }

  render() {
    const {
      watched, unwatched, isAuthenticated, currentUser, adding
    } = this.props;
    let header;
    let data;

    if (!adding) {
      header = 'Watched Markets';
      data = watched;
    } else {
      header = 'Watch New Markets';
      data = unwatched;
    }

    return (
      <div>
        <Navigation />
        <h1>{header}</h1>
        {!adding &&
          <Link to="/watching/new">add</Link>
        }
        {isAuthenticated && data &&
          data.map((market) => {
            return (
              <Market
                market={market}
                adding={adding}
                onSubmit={this.handleSubmit}
                currentUser={currentUser}
                key={market.id.toString()}
              />
            );
          })}
      </div>
    )
  }
}

//  TODO may be able to remove double work in filtering
export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    watched: filterWatching(
      state.channel.market_data,
      state.session.currentUser.markets
    ).watched,
    unwatched: filterWatching(
      state.channel.market_data,
      state.session.currentUser.markets
    ).unwatched,
    currentUser: state.session.currentUser,
  }),
  { addWatching, removeWatching },
)(Watching);
