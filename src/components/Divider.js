import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import Colors from '../static/Colors';

const styles = StyleSheet.create({
  divider: {
    borderRadius: '30px',
    height: '3px',
    width: '50px',
    backgroundColor: Colors.primary,
  },
});

class Divider extends React.Component {
  render() {
    return (
      <div className={css(styles.divider)}/>
    );
  }
}

export default Divider;
