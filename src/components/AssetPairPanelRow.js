//  @flow
import React from 'react';
import { Row, Col } from 'react-grid-system';
import { css , StyleSheet } from 'aphrodite';
import { Button } from 'react-bootstrap';

const styles = StyleSheet.create({
  market: {
    display: 'inline',
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingLeft: '5px',
  },
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
    console.log('clicked');
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
        <Col md={12}>
          <Button
            type="button"
            style={{ display: 'inline' }}
            className="btn btn-xs btn-default"
            onClick={this.handleClick}
          >
            <span className={glyph} />
          </Button>
          <p className={css(styles.market)}>{market.exchange.toUpperCase() + ': ' + market.rate}</p>
        </Col>
      </Row>
    );
  }
}

export default AssetPairPanelRow;
