//  @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Market from '../components/Market';

type Props = {
  isAuthenticated: boolean,
  currentUser: Object,
  market_data: Object,
  state: Object,
}

//  TODO actually need to filter to only Watching and sort

class Watching extends React.Component {

  props: Props

  render() {

    const { state } = this.props;
    const market_data = state.channel.market_data;
    return (
      <div>
        <h1>watching</h1>
        {console.log(state)}
        {market_data &&
          market_data.map((market) => {
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
