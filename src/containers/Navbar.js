//  @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../actions/session';
import Home from './Home';
import Watching from './Watching';
import Register from './Register';
import Signin from './Signin';

type Props = {
  isAuthenticated: boolean,
  currentUser: Object,
  signout: () => void,
}


class Navbar extends React.Component {
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
      <nav>
        <Link to='/' component={Home}>Coinwatch</Link>
        <span>   </span>
        {isAuthenticated &&
          <div style={{ display: 'inline'}}>
            <Link to="/watching" component={Watching}>Watching</Link>
            <span> {currentUser.username} | </span>
            <button type="link" onClick={this.handleLogout}>Sign Out</button>
          </div>
        }
        {!isAuthenticated &&
          <div style={{ display: 'inline' }}>
            <Link to="/signin" component={Signin}>Sign In </Link>
            <span>   </span>
            <Link to="/register" component={Register}>Register</Link>
          </div>
        }
      </nav>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { signout },
)(Navbar);
