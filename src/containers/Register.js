//  @flow
/**
 * Created by connor on 11/8/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'react-bootstrap';
import { register } from '../actions/session';
import RegisterForm from '../components/RegisterForm';
import Navigation from './Navigation';

type Props = {
  register: () => void,
};

class Register extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();
    this.handleRegister = this.handleRegister.bind(this);
  }

  props: Props

  handleRegister(data) {
    this.props.register({ user: data }, this.context.router);
  }

  render() {
    return (
      <div>
        <Navigation />
        <RegisterForm onSubmit={this.handleRegister} />
      </div>
    );
  }
}

export default connect(null, { register })(Register);
