//  @flow
import React from 'react';
import { Row, Col } from 'react-grid-system';
import { css, StyleSheet } from 'aphrodite';
import CryptoCompare from 'cryptocompare';
import { timeParse } from 'd3-time-format';
import Navigation from './Navigation';
import CandleStickChartContinuous from '../components/CandleStickChartContinuous';
import Divider from '../components/Divider';

const styles = StyleSheet.create({
  chart: {
    marginTop: '50px',
  },

  unavailable: {
    borderRadius: '5px',
    backgroundColor: 'lightgrey',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

type Props = {
  market: Object,
}

// TODO buttons for states
// TODO render loading icon? if error, render error
class MarketChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      lastUpdate: 0,
      setting: 'Daily',
    };

    this.getData = this.getData.bind(this);
    this.processData = this.processData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const now = new Date().getTime() / 1000;
    const delta = now - this.state.lastUpdate;
    const { setting } = this.state;

    if ((setting === 'Daily' && delta < 86400)
      || (setting === 'Hourly' && delta < 3600)
      || (setting === 'Minutely' && delta < 60)) {
      return;
    }

    if ((now - this.state.lastUpdate) < 60) {
      return;
    }

    const { market } = this.props;
    const assets = this.splitAssetPair(market.pair.toUpperCase());
    const exchange = market.exchange.toUpperCase();

    switch (this.state.setting) {
      case 'Daily':
        this.histoDay(assets.fsym, assets.tsym, exchange);
        break;
      case 'Hourly':
        this.histoHour(assets.fsym, assets.tsym, exchange);
        break;
      case 'Minutely':
        this.histoMinute(assets.fsym, assets.tsym, exchange);
        break;
      default:
    }
  }

  props: Props

  histoDay(fsym, tsym, exchange) {
    CryptoCompare.histoDay(fsym, tsym, { exchange: exchange, limit: 'none' })
      .then(data => this.processData(data));
  }

  histoHour(fsym, tsym, exchange) {
    CryptoCompare.histoHour(fsym, tsym, { exchange: exchange, limit: 5000 })
      .then(data => this.processData(data));
  }

  histoMinute(fsym, tsym, exchange) {
    CryptoCompare.histoMinute(fsym, tsym, { exchange: exchange, limit: 5000 })
      .then(data => this.processData(data));
  }

  processData(data) {
    const parseDate = timeParse('%s');
    const history = [];
    const now = new Date().getTime() / 1000;
    data.forEach((d) => {
      history.push({
        date: new Date(parseDate(d.time)),
        open: d.open,
        close: d.close,
        high: d.high,
        low: d.low,
      });
    });
    this.setState({ history: history, lastUpdate: now });
  }

  splitAssetPair(pair) {
    return {
      fsym: pair.slice(0, 3),
      tsym: pair.slice(3),
    };
  }

  render()  {
    this.getData();
    const { market } = this.props;

    return (
      <div>
        <Navigation />
        <div className={css(styles.main)}>
          <Row className={css(styles.chart)}>
            <Col md={8} offset={{ md: 2 }}>
              <h3>{market.exchange.toUpperCase() + ': ' + market.pair.toUpperCase()}</h3>
              <Divider />
            </Col>
          </Row>
          <Row>
            <Col md={8} offset={{ md: 2 }}>
              {this.state.history.length > 0 &&
                <CandleStickChartContinuous
                  data={this.state.history}
                  width={1000}
                  ratio={2}
                />
              }
              {this.state.history.length === 0 &&
                <div className={css(styles.unavailable)}>
                  <h3>No data available</h3>
                </div>
              }
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}


export default MarketChart;
