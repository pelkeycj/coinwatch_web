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
import MarketChart from './MarketChart';
import MarketChartIndex from './MarketChartIndex';


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
          <RestrictedRoute authed={!isAuthenticated} exact path="/register" redir="/" component={Register} />
          <RestrictedRoute authed={!isAuthenticated} exact path="/signin" redir="/" component={Signin} />
          <RestrictedRoute authed={isAuthenticated} exact path="/watching" redir="/" component={Watching} />
          <RestrictedRoute authed={isAuthenticated} exact path="/watching/new"  redir="/" component={AddWatching} />
          <RestrictedRoute authed={isAuthenticated} exact path="/profile" redir="/" component={Profile} />
          <RestrictedRoute authed={isAuthenticated} exact path="/profile/edit" redir="/" component={EditProfile} />
          <Route exact path="/chart/markets" component={MarketChartIndex} />
        </Switch>
      </BrowserRouter>
    );
  }
}

// if authed is true, present component, else redirect to landing page
function RestrictedRoute({ component: Component, redir, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props => authed === true
        ? <Component />
        : <Redirect to={{ pathname: redir }} />)
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
