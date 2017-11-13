//  @flow

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signin } from '../actions/session';
import SigninForm from '../components/SigninForm';
import Navigation from './Navigation';

type Props = {
  signin: () => void,
};

class Signin extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.handleSignin = this.handleSignin.bind(this);
  }

  props: Props

  handleSignin(data) {
    this.props.signin(data, this.context.router);
  }

  render() {
    return (
      <div>
        <Navigation />
        <SigninForm onSubmit={this.handleSignin} />;
      </div>
    );
  }
}

export default connect(null, { signin })(Signin);
