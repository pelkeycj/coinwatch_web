//  @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite';
import { Button } from 'react-bootstrap';
import Input from './Input';
import Colors from '../static/Colors';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    height: '800px',
    padding: '20rem 4rem',
    margin: 'auto',
  },

  button: {
    borderRadius: '25px',
    borderColor: Colors.primary,
    color: Colors.primary,
    background: 'white',
    marginTop: '10px',
    ':hover': {
      color: 'black',
      background: Colors.primary,
    },
  },
});

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
}

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  props: Props

  handleSubmit(data) {
    this.props.onSubmit(data);
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form className={css(styles.card)} onSubmit={handleSubmit(this.handleSubmit)} >
        <div style={{ textAlign: 'center' }}>
          <h1>Sign up</h1>
        </div>
        <Field
          name="username"
          type="text"
          component={Input}
          placeholder="Username"
          style={{ marginTop: '10px' }}
          className="form-control"
        />
        <Field
          name="email"
          type="email"
          component={Input}
          placeholder="Email"
          style={{ marginTop: '10px' }}
          className="form-control"
        />
        <Field
          name="password"
          type="password"
          component={Input}
          placeholder="Password"
          style={{ marginTop: '10px' }}
          className="form-control"
        />
        <Field
          name="password_confirmation"
          type="password"
          component={Input}
          placeholder="Confirm Password"
          style={{ marginTop: '10px' }}
          className="form-control"
        />
        <div style={{ textAlign: 'center' }}>
          <Button type="submit" disabled={submitting} className={css(styles.button)}>
            {submitting ? 'Submitting...' : 'Sign Up'}
          </Button>
        </div>
        {/*
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary"
        >
          {submitting ? 'Submitting . . . ' : 'Sign Up'}
        </button>
        */}
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
