//  @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Market from '../components/Market';
import Navbar from './Navbar';
import { filterWatching } from '../utils/MarketUtils';
import { addWatching, removeWatching } from '../actions/watching';

type Props = {
  addWatching: () => void,
  removeWatching: () => void,
  isAuthenticated: boolean,
  currentUser: Object,
  market_data: Object,
  state: Object,
  adding: boolean,
}


class Watching extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      watched: [],
      unwatched: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMarkets = this.setMarkets.bind(this);
  }

  componentWillMount() {
    console.log('setting markets from will mount');
    this.setMarkets();
  }

  setMarkets() {
    console.log('setting markets');
    const { isAuthenticated, currentUser, market_data } = this.props;
    let bins;

    if (isAuthenticated) {
      bins = filterWatching(market_data, currentUser.markets);
      this.setState({ watched: bins.watched, unwatched: bins.unwatched });
    }
    console.log("watched", this.state.watched);
    console.log("unwatched", this.state.unwatched);
  }

  props: Props

  handleSubmit(data) {
    if (this.props.adding) {
      this.props.addWatching(data);
    } else {
      this.props.removeWatching(data);
    }
    this.setMarkets();
    this.forceUpdate();
  }

  render() {
    const { adding, currentUser } = this.props;
    //const { state, isAuthenticated, currentUser, adding } = this.props;
    //const market_data = state.channel.market_data;
    let header;
    let data;
    //let bins;
    //let data;

    //if (isAuthenticated) {
    //  bins = filterWatching(market_data, currentUser.markets);
    // }

    if (!adding) {
      header = 'Watched Markets';
      data = this.state.watched;
      /*
      if (isAuthenticated && bins) {
        data = bins.watched;
      }
      */
    } else {
      header = 'Watch New Markets';
      data = this.state.unwatched;
      /*
      if (isAuthenticated && bins) {
        data = bins.unwatched;
      }
      */
    }

    return (
      <div>
        <Navbar />
        <h1>{header}</h1>
        {!adding &&
          <Link to="/watching/new">add</Link>
        }
        {data &&
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

export default connect(
  state => ({
    state: state,
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
    market_data: state.channel.market_data,
  }),
  { addWatching, removeWatching },
)(Watching);
