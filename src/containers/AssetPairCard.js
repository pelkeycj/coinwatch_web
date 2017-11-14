//  @flow
import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

//TODO props

//TODO styles

//TODO render card with asset pair header and body containing assets

// TODO probably need to be able to remove from within a market (pass props?)

// TODO create MarketRate -> Maybe link to MarketChart component that
      // will fetch data from backend (relayed) and use D3/chart.js to
      // do some fancy stock graph. Maybe we'd want it to re fetch every 30s?

      // maybe use a modal
type Props = {
  assetPair: string,
  markets: Object,
};

class AssetPairCard extends React.Component {

  props: Props

  render() {
    const { assetPair, markets } = this.props;
    return (
      <Panel collapsible defaultExpanded header={assetPair}>
        <ListGroup fill>
          {markets.forEach((market) => {
            return (
              <ListGroupItem>{market.exchange + ' : ' + market.rate}</ListGroupItem>
            );
          })}
        </ListGroup>
      </Panel>
    );
  }
}

export default AssetPairCard;
