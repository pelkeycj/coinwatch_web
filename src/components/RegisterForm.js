//  @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';
//  import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';
import Input from '../Input';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
}

class RegisterForm extends React.Component {
  props: Props

  handleSubmit(data) {
    this.props.onSubmit(data);
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className={css(styles.card)} onSubmit={handleSubmit(this.handleSubmit)} >
        <h3>Sign up</h3>
        <Field
          name="username"
          type="text"
          component={Input}
          placeholder="Username"
          className="form-control"
        />
        <Field
          name="email"
          type="email"
          component={Input}
          placeholder="Email"
          className="form-control"
        />
        <Field
          name="password"
          type="password"
          component={Input}
          placeholder="Password"
          className="form-control"
        />
        <Field
          name="password_confirmation"
          type="password"
          component={Input}
          placeholder="Confirm Password"
          className="form-control"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary"
        >
          {submitting ? 'Submitting . . . ' : 'Sign Up'}
        </button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }
  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match';
  }
};

export default reduxForm({
  form: 'register',
  validate,
})(RegisterForm);
