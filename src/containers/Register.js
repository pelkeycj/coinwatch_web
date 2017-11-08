//  @flow
/**
 * Created by connor on 11/8/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../actions/session'; //TODO
import RegisterForm from '../components/RegisterForm';

type Props = {
  register: () => void,
};

class Register extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  props: Props

  handleRegister(data) {
    this.props.register(data, this.context.router);
  }

  render() {
    return (
      //TODO navbar and styling
      <RegisterForm onSubmit={this.handleRegister} />
    );
  }
}

export default connect(null, { register })(Register);
