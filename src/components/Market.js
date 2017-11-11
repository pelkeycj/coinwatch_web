//  @flow
import React from 'react';
import { connect } from 'react-redux';
import { addWatching, removeWatching } from '../actions/watching';

type Props = {
  addWatching: () => void,
  removeWatching: () => void,
  market: Object,
  adding: boolean,
  currentUser: object,
}

class Market extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  props: Props

  handleSubmit() {
    const market_id = this.props.market.id;
    const user_id = this.props.currentUser.id;

    if (this.props.adding) {
      this.props.addWatching({ market_id, user_id });
    } else {
      this.props.removeWatching({ market_id, user_id });
    }
  }

  render() {
    const market = this.props.market;
    let text;
    if (this.props.adding) {
      text = 'watch';
    } else {
      text = 'unwatch';
    }

    return (
      <div>
        <div syle={{ display: 'flex' }}>
          <h4>{market.exchange + ":" + market.pair + "   " + market.rate}</h4>
        </div>
        <div style={{ display: 'flex' }}>
          <button type="submit" onClick={this.handleSubmit}>{text}</button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    currentUser: state.session.currentUser,
  }),
  { addWatching, removeWatching },
)(Market);
