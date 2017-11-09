//  @flow

import React, { Component } from 'react';
//  import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //  to connect to store
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { authenticate } from '../actions/session'; //  authenticate on mount
import Home from './Home';
import Register from './Register';
import Signin from './Signin';


type Props = {
  authenticate: () => void,
}

class App extends Component {
  componentDidMount() {
    //  upon mount (refresh), if a token is present, authenticate
    // to persist user session
    const token = localStorage.getItem('token');
    if (token) {
      this.props.authenticate();
    }
  }

  props: Props

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(
  null, //  the state?
  { authenticate }, //  the action to perform
)(App);
