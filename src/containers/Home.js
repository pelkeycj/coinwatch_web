//  @flow
/**
 * Created by connor on 11/8/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Register from './Register';
import { signout } from '../actions/session';


type Props = {
  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
}

class Home extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  props: Props

  handleLogout() {
    this.props.logout(this.context.router);
  }

  render() {
    const { currentUser, isAuthenticated } = this.props;

    return (
      <div>
        <Link to="/register" component={Register}>Sign up</Link>
        {isAuthenticated &&
          <div>
            <span>{currentUser.username}</span>
            <button type="button" onClick={this.handleLogout}>Sign out</button>
          </div>}
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { signout }
)(Home);
