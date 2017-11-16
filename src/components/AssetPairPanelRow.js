//  @flow
import React from 'react';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import { Button } from 'react-bootstrap';

const styles = StyleSheet.create({
  market: {
    display: 'inline',
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingLeft: '5px',
  },

  link: {
    color: 'black',
    textDecoration: 'none',
    ':hover': {
      color: 'gray',
      textDecoration: 'none',
    },
  },

  glyph_button: {
    backgroundColor: 'white',
  }
});

type Props = {
  handleSubmit: () => void,
  market: Object,
  adding: boolean,
}

class AssetPairPanelRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleSubmit(this.props.market);
  }

  props: Props

  render() {
    const { market, adding } = this.props;
    let glyph = "glyphicon glyphicon-remove";
    if (adding) {
      glyph = "glyphicon glyphicon-plus";
    }

    return (
      <Row align="center">
        <Col md={1}>
          <Button
            type="button"
            style={{ display: 'inline' }}
            className="btn btn-xs btn-default"
            onClick={this.handleClick}
          >
            <span className={glyph} />
          </Button>
          </Col>

        <Col md={5}>

        <Link className={css(styles.link)} to={{ pathname:"/chart/markets", state: { markets: [market] }}}>
          <p className={css(styles.market)}>{market.exchange.toUpperCase() + ': '}</p>
        </Link>
        </Col>

        <Col md={6} style={{ textAlign: 'right' }}>
          <p style={{ color: market.color }} className={css(styles.market)}>{ market.rate + ' (' + market.delta + ')'} </p>
        </Col>
      </Row>
    );
  }
}

export default AssetPairPanelRow;
