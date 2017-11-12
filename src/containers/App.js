//  @flow

import React, { Component } from 'react';
//  import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //  to connect to store
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { authenticate } from '../actions/session'; //  authenticate on mount
import { connectToChannel } from '../actions/channel';
import Home from './Home';
import Register from './Register';
import Signin from './Signin';
import Watching from './Watching';
import AddWatching from './AddWatching';
import Profile from './Profile';
import EditProfile from './EditProfile';


type Props = {
  authenticate: () => void,
  connectToChannel: () => void,
  isAuthenticated: boolean,
}

class App extends Component {
  componentDidMount() {
    //  upon mount (refresh), if a token is present, authenticate
    // to persist user session
    const token = localStorage.getItem('token');
    if (token) {
      this.props.authenticate();
    }
    this.props.connectToChannel();
  }

  props: Props

  render() {
    const { isAuthenticated } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <RestrictedRoute authed={!isAuthenticated} exact path="/register" component={Register} />
          <RestrictedRoute authed={!isAuthenticated} exact path="/signin" component={Signin} />
          <RestrictedRoute authed={isAuthenticated} exact path="/watching" component={Watching} />
          <RestrictedRoute authed={isAuthenticated} exact path="/watching/new" component={AddWatching} />
          <RestrictedRoute authed={isAuthenticated} exact path="/profile" component={Profile} />
          <RestrictedRoute authed={isAuthenticated} exact path="/profile/edit" component={EditProfile} />
        </Switch>
      </BrowserRouter>
    );
  }
}

// if authed is true, present component, else redirect to landing page
function RestrictedRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props => authed === true
        ? <Component />
        : <Redirect to={{ pathname: '/' }} />)
      }
    />
  );
}

//  private route

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
  }),
  { authenticate, connectToChannel }, //  the action to perform
)(App);
