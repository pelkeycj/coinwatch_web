//  @flow
import React from 'react';
import { Row, Col } from 'react-grid-system';
import { css, StyleSheet } from 'aphrodite';
import { ButtonToolbar, Button, ButtonGroup } from 'react-bootstrap';
import CryptoCompare from 'cryptocompare';
import { timeParse } from 'd3-time-format';
import Navigation from './Navigation';
import CandleStickChartContinuous from '../components/CandleStickChartContinuous';
import Divider from '../components/Divider';
import Colors from '../static/Colors';

const styles = StyleSheet.create({
  main: {
    marginTop: '50px',
  },

  chart: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  unavailable: {
    borderRadius: '5px',
    backgroundColor: 'lightgrey',
    textAlign: 'center',
    fontWeight: 'bold',
  },


  button: {
    borderRadius: '25px',
    borderColor: Colors.primary,
    color: Colors.primary,
    background: 'white',
    ':hover': {
      color: 'white',
      background: Colors.primary,
    },
  },

  button_select: {
    borderRadius: '25px',
    borderColor: Colors.primary,
    color: 'white',
    background: Colors.primary,
  }
});

type Props = {
  market: Object,
}

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
    this.setTimeFrame = this.setTimeFrame.bind(this);
  }

  componentDidMount() {
    //this.interval = setInterval(this.getData, 60);
    this.getData();
  }

  componentWillUnmount() {
    //clearInterval(this.interval);
  }

  getData() {
    console.log('getting');
    const now = new Date().getTime() / 1000;
    const delta = now - this.state.lastUpdate;
    const { setting } = this.state;

    /*
    if ((setting === 'Daily' && delta < 86400)
      || (setting === 'Hourly' && delta < 3600)
      || (setting === 'Minutely' && delta < 10)) {
      return;
    }
    */

    const { market } = this.props;
    const assets = this.splitAssetPair(market.pair.toUpperCase());
    const exchange = market.exchange.toUpperCase();

    switch (this.state.setting) {
      case 'Daily':
        //this.interval = setInterval(this.getData, 86400);
        this.histoDay(assets.fsym, assets.tsym, exchange);
        break;
      case 'Hourly':
        //this.interval = setInterval(this.getData, 3600);
        this.histoHour(assets.fsym, assets.tsym, exchange);
        break;
      case 'Minutely':
        //this.interval = setInterval(this.getData, 30);
        this.histoMinute(assets.fsym, assets.tsym, exchange);
        break;
      default:
    }
  }


  histoDay(fsym, tsym, exchange) {
    CryptoCompare.histoDay(fsym, tsym, { exchange, limit: 'none' })
      .then(data => this.processData(data));
  }

  histoHour(fsym, tsym, exchange) {
    CryptoCompare.histoHour(fsym, tsym, { exchange, limit: 5000 })
      .then(data => this.processData(data));
  }

  histoMinute(fsym, tsym, exchange) {
    CryptoCompare.histoMinute(fsym, tsym, { exchange, limit: 5000 })
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
    this.setState({ history, lastUpdate: now });
    this.forceUpdate();
  }

  splitAssetPair(pair) {
    return {
      fsym: pair.slice(0, 3),
      tsym: pair.slice(3),
    };
  }

  setTimeFrame(setting) {
    this.setState({ setting, lastUpdate: 0 });
    this.getData();
  }

  getBtn(setting, target) {
    if (setting === target) {
      return <Button className={css(styles.button_select)}>{target}</Button>;
    }
    return (
      <Button
        onClick={() => this.setTimeFrame(target)}
        className={css(styles.button)}
      >
        {target}
      </Button>
    );
  }

  props: Props

  render()  {
    this.getData();
    const { market } = this.props;
    const { setting } = this.state;

    const daily_btn = this.getBtn(setting, 'Daily');
    const hourly_btn = this.getBtn(setting, 'Hourly');
    const min_btn = this.getBtn(setting, 'Minutely');

    return (
      <div>
        <Navigation />
        <div className={css(styles.main)}>
          <Row className={css(styles.main)}>
            <Col md={8} offset={{ md: 2 }}>
              <Row align="center">
                <Col md={8}>
                  <h3>{market.exchange.toUpperCase() + ': ' + market.pair.toUpperCase()}</h3>
                </Col>
              </Row>
              <Row style={{ marginBottom: '10px' }}>
                <Col md={6}>
                  <ButtonToolbar>
                    <ButtonGroup >
                      {daily_btn}
                      {hourly_btn}
                      {min_btn}
                    </ButtonGroup>
                  </ButtonToolbar>
                </Col>
              </Row>
              <Divider />
            </Col>
          </Row>
          <Row>
            <Col md={8} offset={{ md: 2 }}>
              {this.state.history.length > 0 &&
                <CandleStickChartContinuous
                  data={this.state.history}
                  className={css(styles.chart)}
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
