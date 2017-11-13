//  @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { signout } from '../actions/session';
import Colors from '../static/Colors';

const styles = StyleSheet.create({
  nav: {
    background: Colors.primary,
    borderWidth: '0',
  },

  link: {
    color: 'white',
    textDecoration: 'none',
    ':hover': {
      color: 'black',
      textDecoration: 'none',
    },
  },

  signout: {
    color: 'lightgrey',
    textDecoration: 'none',
    ':hover': {
      color: 'black',
      textDecoration: 'none',
    },
  },
});

type Props = {
  isAuthenticated: boolean,
  currentUser: Object,
  signout: () => void,
}


class Navigation extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  props: Props

  handleLogout() {
    this.props.signout(this.context.router);
  }

  render() {
    const { isAuthenticated, currentUser } = this.props;
    return (

      <Navbar inverse collapseOnSelect fixedTop className={css(styles.nav)}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className={css(styles.link)}>
              Coinwatch
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {isAuthenticated &&
            <Nav pullRight>
              <NavItem>
                <Link to="/watching" className={css(styles.link)}>
                  Watching
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/profile" className={css(styles.link)}>
                  {currentUser.username}
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/" onClick={this.handleLogout} className={css(styles.signout)}>
                  Sign Out
                </Link>
              </NavItem>
            </Nav>
          }
          {!isAuthenticated &&
          <Nav pullRight>
            <NavItem>
              <Link to="/register" className={css(styles.link)}>
                Sign Up
              </Link>
            </NavItem>

            <NavItem>
              <Link to="/signin" className={css(styles.link)}>
                Sign In
              </Link>
            </NavItem>
          </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { signout },
)(Navigation);
