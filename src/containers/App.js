//  @flow

import React, { Component } from 'react';
//  import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //  to connect to store
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { authenticate } from '../actions/session'; //  authenticate on mount
import { connectToChannel } from '../actions/channel';
import Home from './Home';
import Register from './Register';
import Signin from './Signin';
import Watching from './Watching';
import AddWatching from './AddWatching';


type Props = {
  authenticate: () => void,
  connectToChannel: () => void,
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
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/watching" component={Watching} />
          <Route exact path="/watching/new" component={AddWatching} />
          {/* TODO add a watching page, ensure auth */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(
  null, //  the state?
  { authenticate, connectToChannel }, //  the action to perform
)(App);
