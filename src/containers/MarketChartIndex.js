//  @flow
import React from 'react';
import { Row, Col } from 'react-grid-system';
import { css, StyleSheet } from 'aphrodite';
import MarketChart from './MarketChart';
import Navigation from './Navigation';

const styles = StyleSheet.create({
  header: {
    marginTop: '100px',
    textAlign: 'center',
  }
});

type Props = {
  location: Object,
}

class MarketChartIndex extends React.Component {
  props: Props

    render() {
      const { markets } = this.props.location.state;

      return (
        <div style={{ marginBottom: '50px' }}>
          <Navigation />
          <Row className={css(styles.header)}>
            <Col md={8} offset={{ md: 2 }} >
              <h1>Price History</h1>
            </Col>
          </Row>
          {markets.map((market) => {
            return <MarketChart market={market} />
          })}
        </div>
      );
    }
}

export default MarketChartIndex;
