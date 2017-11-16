//  @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import { Col, Row } from 'react-grid-system';
import { Button } from 'react-bootstrap';
import Navigation from './Navigation';
import { filterWatching, groupByAssetPair } from '../utils/MarketUtils';
import AssetPairCard from './AssetPairCard';
import Colors from '../static/Colors';

const styles = StyleSheet.create({
  body: {
    maxWidth: '80%',
    marginTop: '100px',
    marginBottom: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cards: {
    display: 'flex',
    flexDirection: 'col',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'baseline',
  },

  button: {
    borderRadius: '25px',
    borderColor: Colors.primary,
    color: Colors.primary,
    background: 'white',
    marginTop: '10px',
    ':hover': {
      color: 'white',
      background: Colors.primary,
    },
  },

});

type Props = {
  addWatching: () => void,
  removeWatching: () => void,
  isAuthenticated: boolean,
  currentUser: Object,
  watched: Object,
  unwatched: Object,
  adding: boolean,
}


class MarketList extends React.Component {
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
    let text;

    if (!adding) {
      header = 'Watched Markets';
      data = watched;
      text = 'Here are the markets you follow. Select a market or group of markets to view price charts.';
    } else {
      header = 'Watch New Markets';
      data = unwatched;
      text = 'Follow new markets to monitor them on your dashboard.';
    }

    data = groupByAssetPair(data);

    return (
      <div>
        <Navigation />
        <div className={css(styles.body)}>
          <Row align="center" style={{ marginBottom: '50px' }}>
            <Col md={4} offset={{ md: 4 }} style={{ textAlign: 'center' }}>
              <h1>{header}</h1>
              <p>{text}</p>
            </Col>
            <Col md={1} style={{ textAlign: 'left' }}>
              {!adding &&
                <Link to="/watching/new">
                  <Button type="submit" className={css(styles.button)} >
                    Add
                  </Button>
                </Link>
              }
            </Col>
          </Row>
          {isAuthenticated && data &&
            Object.keys(data).map((assetPair) => {
              return (
                <Row>
                  <Col offset={{ md: 4 }} md={4}>
                    <AssetPairCard
                      adding={adding}
                      assetPair={assetPair}
                      markets={data[assetPair]}
                    />
                  </Col>
                </Row>
              );
            })}
        </div>
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
  null,
)(MarketList);
