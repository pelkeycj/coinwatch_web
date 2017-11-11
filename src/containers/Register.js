//  @flow
/**
 * Created by connor on 11/8/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../actions/session';
import RegisterForm from '../components/RegisterForm';
import Navbar from './Navbar';

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
        <Navbar />
        <RegisterForm onSubmit={this.handleRegister} />
      </div>
    );
  }
}

export default connect(null, { register })(Register);
