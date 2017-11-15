//  @flow
import React from 'react';
import { Row, Col } from 'react-grid-system';
import { css, StyleSheet } from 'aphrodite';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const styles = StyleSheet.create({
  add_btn: {
    display: 'inline',
  },
  title: {
    paddingLeft: '5px',
    display: 'inline',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

type Props = {
  handleSubmit: () => void,
  assetPair: string,
  markets: Object,
  adding: boolean,
}

class AssetPairPanelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('clicked');
    this.props.handleSubmit(this.props.markets);
  }

  props: Props

  render() {
    const { assetPair, adding, markets } = this.props;
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

          <Link to={{ pathname: "/chart/markets", state: { markets} }}>
            <p className={css(styles.title)}>{assetPair.toUpperCase()}</p>
          </Link>
        </Col>
      </Row>
    );
  }
}

export default AssetPairPanelHeader;
