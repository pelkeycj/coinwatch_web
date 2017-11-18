//  @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import { Col, Row } from 'react-grid-system';
import ReactList from 'react-list';
import { Button } from 'react-bootstrap';
import Navigation from './Navigation';
import { filterWatching, groupByAssetPair } from '../utils/MarketUtils';
import AssetPairCard from './AssetPairCard';
import Colors from '../static/Colors';

const styles = StyleSheet.create({
  body: {
    maxWidth: '90%',
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

  search: {
    marginBottom: '10px',
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

    const { adding } = this.props;
    let data;
    if (adding) {
      data = this.props.unwatched;
    } else {
      data = this.props.watched;
    }

    this.state = {
      search_text: '',
      filtered: data,
      data,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.searchInputChange = this.searchInputChange.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  props: Props

  handleSubmit(data) {
    if (this.props.adding) {
      this.props.addWatching(data);
    } else {
      this.props.removeWatching(data);
    }
  }

  searchInputChange(e) {
    const search_text = e.target.value;
    const filtered = this.searchFilter(this.state.data, search_text);
    this.setState({ search_text, filtered });
    this.forceUpdate();
  }

  searchFilter(market_list, search_text) {
    if (!search_text || search_text === '') {
      return market_list;
    }

    const filtered = market_list.filter(market => {
      const market_text = market.exchange.toUpperCase() + ':' + market.pair.toUpperCase();
      return market_text.includes(search_text.toUpperCase());
    });
    return filtered;
  }

  componentWillReceiveProps(nextProps) {
    const { search_text } = this.state;
    let new_data;
    if (nextProps.adding) {
      new_data = nextProps.unwatched;
    } else {
      new_data = nextProps.watched;
    }

    this.setState({ data: new_data, filtered: this.searchFilter(new_data, search_text) });
    this.forceUpdate();
  }

  renderItem(index, key) {
    const { filtered } = this.state;
    const data = Object.entries(groupByAssetPair(filtered));

    const panel = data[index];
    return (
      <Row key={key}>
        <Col offset={{ md: 4 }} md={4}>
          <AssetPairCard
            adding={this.props.adding}
            assetPair={panel[0]}
            markets={panel[1]}
          />
        </Col>
      </Row>
    );
  }

  render() {
    const {
      isAuthenticated, adding,
    } = this.props;
    const { filtered } = this.state;
    const data = Object.entries(groupByAssetPair(filtered));
    let header;
    let text;

    if (!adding) {
      header = 'Watched Markets';
      text = 'Here are the markets you follow. Select a market or group of markets to view price charts.';
    } else {
      header = 'Watch New Markets';
      text = 'Follow new markets to monitor them on your dashboard.';
    }


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

          <Row>
            <Col md={4} offset={{ md: 4 }} className={css(styles.search)}>
              <input type="text" placeholder="Search" onChange={this.searchInputChange} />
            </Col>

          </Row>

          {isAuthenticated && data &&

            <ReactList
              itemRenderer={this.renderItem}
              length={data.length}
              type="variable"
              pageSize={20}
            />
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    watched: filterWatching(
      state.channel.market_data,
      state.session.currentUser.markets,
    ).watched,
    unwatched: filterWatching(
      state.channel.market_data,
      state.session.currentUser.markets,
    ).unwatched,
    currentUser: state.session.currentUser,
  }),
  null,
)(MarketList);
