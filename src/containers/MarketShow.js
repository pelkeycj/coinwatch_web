//  @flow
import React from 'react';
import { Row, Col } from 'react-grid-system';
import { css, StyleSheet } from 'aphrodite';
import CryptoCompare from 'cryptocompare';
import { timeParse } from 'd3-time-format';
import Navigation from './Navigation';
import CandleStickChart from '../components/CandleStickChart';
import CandleStickChartContinuous from '../components/CandleStickChartContinuous'

const styles = StyleSheet.create({
  main: {
    marginTop: '100px',
  }
});

class MarketShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      histoDay: [],
    };
  }



  componentDidMount() {
    CryptoCompare.histoDay('BTC', 'USD', {limit: 'none'})
      .then(data => {
        const parseDate = timeParse('%s');
        const histoDay = [];
        data.map((d) => {
          histoDay.push({
            date: new Date(parseDate(d.time)),
            open: d.open ,
            close: d.close,
            high: d.high,
            low: d.low,
          });
        });
        this.setState({ histoDay: histoDay });
      });
  }

/*
  getData() {
    const histoDay = [];
    return CryptoCompare.histoDay('BTC', 'USD')
      .then(data => {
        const parseDate = timeParse('%s');
        // TODO might not even need to process, date comes already
        data.map((d) => {
          histoDay.push({
            date: new Date(parseDate(d.time)),
            open: d.open ,
            close: d.close,
            high: d.high,
            low: d.low,
          });
        })
        return histoDay;
      });
  }
*/
  props: Props
  render()  {
    console.log('histoDat', this.state.histoDay);
    return (
      <div>
        <Navigation />
        <div className={css(styles.main)}>
        <h1>Price History</h1>
        {this.state.histoDay.length > 0 &&
          <CandleStickChartContinuous
            data={this.state.histoDay}
            width={800}
            ratio={2}
          />
        }
        </div>

      </div>
    );
  }
}


export default MarketShow;
