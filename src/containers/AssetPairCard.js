//  @flow
import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import AssetPairPanelHeader from '../components/AssetPairPanelHeader';
import AssetPairPanelRow from '../components/AssetPairPanelRow';
import { addWatching, removeWatching } from '../actions/watching';

// TODO create MarketRate -> Maybe link to MarketChart component that
      // will fetch data from backend (relayed) and use D3/chart.js to
      // do some fancy stock graph. Maybe we'd want it to re fetch every 30s?

      // maybe use a modal
type Props = {
  addWatching: () => void,
  removeWatching: () => void,
  assetPair: string,
  markets: Object,
  adding: boolean,
  currentUser: Object,
  isAuthenticated: Object,
};

class AssetPairCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleOne = this.handleOne.bind(this);
    this.handleAll = this.handleAll.bind(this);
  }

  props: Props

  handleOne(data) {
    const params = { market_user: { user_id: this.props.currentUser.id, market_id: data.id } };
    console.log('handle one', params);
    if (this.props.adding) {
      this.props.addWatching(params);
    } else {
      this.props.removeWatching(params);
    }
    this.forceUpdate();
  }

  handleAll(data) {
    const markets = [];
    data.forEach((market) => {
      markets.push(market.id);
    });
    const params = { user_id: this.props.currentUser.id, markets };
    console.log('handle all', params);
    if (this.props.adding) {
      this.props.addWatching(params);
    } else {
      this.props.removeWatching(params);
    }
    this.forceUpdate();
  }

  render() {
    const { assetPair, markets, adding } = this.props;
    return (
      <Panel
        collapsible
        defaultExpanded
        header={
          <AssetPairPanelHeader
            adding={adding}
            assetPair={assetPair}
            markets={markets}
            handleSubmit={this.handleAll}
          />
        }
      >
        <ListGroup fill>
          {markets.map((market) => {
            return (
              <ListGroupItem>
                <AssetPairPanelRow
                  key={market.id}
                  adding={adding}
                  market={market}
                  handleSubmit={this.handleOne}
                />
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Panel>
    );
  }
}

export default connect(
  state => ({
    currentUser: state.session.currentUser,
    isAuthenticated: state.session.isAuthenticated,
  }),
  { addWatching, removeWatching },
)(AssetPairCard);
