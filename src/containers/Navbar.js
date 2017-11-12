//  @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../actions/session';


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
        <Link to='/'>Coinwatch</Link>
        <span>   </span>
        {isAuthenticated &&
          <div style={{ display: 'inline'}}>
            <Link to="/watching">Watching</Link>
            <span>    </span>
            <Link to="/profile"> {currentUser.username}</Link>
            <span>   |  </span>
            <button type="link" onClick={this.handleLogout}>Sign Out</button>
          </div>
        }
        {!isAuthenticated &&
          <div style={{ display: 'inline' }}>
            <Link to="/signin">Sign In </Link>
            <span>   </span>
            <Link to="/register">Register</Link>
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
