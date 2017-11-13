//  @flow
import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { Image } from 'react-bootstrap';
import { Row, Col } from 'react-grid-system';

//  TODO this needs work: rendering gets all messed up
const styles = StyleSheet.create({
  section: {
    height: '300px',
    textAlign: 'center',
    position: 'relative',
  },

  textBox: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    width: '80%',
    height: '50%',
    margin: 'auto',
    textAlign: 'left',
    padding: '10%',
  },

  centerContentsVertical: {
    width: '100%',
    height: '100%',
  },

  imageBox: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100%',
    height: '100%',
  },
});

type Props = {
  text: string,
  img: string,
  text_first: boolean,
}

// Render a text blurb and image side by side
class InfoSection extends React.Component {

  props: Props

  render() {
    let text = (
      <Col md={6} className={css(styles.centerContentsVertical)}>
        <div className={css(styles.textBox)}>
          <h2>{this.props.text}</h2>
        </div>
      </Col>
    );

    let image = (
      <Col md={6} >
        <div className={css(styles.imageBox)}>
          <Image src={this.props.img} responsive />
        </div>
      </Col>
    );

    if (this.props.text_first) {
      return (
        <Row className={css(styles.section)}>
          { text }
          { image }
        </Row>
      );
    }

    return (
      <Row className={css(styles.section)}>
        { image }
        { text }
      </Row>
    );
  }
}

export default InfoSection;
