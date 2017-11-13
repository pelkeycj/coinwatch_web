//  @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite';
import { Button } from 'react-bootstrap';
import Input from './Input';
import Colors from '../static/Colors'

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    height: '800px',
    padding: '25rem 4rem',
    margin: '2rem auto',
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

class SigninForm extends React.Component {
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
          <h1>Sign In</h1>
        </div>
        <Field
          name="username"
          type="text"
          component={Input}
          placeholder="Username"
          className="form-control"
          style={{ marginTop: '10px' }}
        />
        <Field
          name="password"
          type="password"
          component={Input}
          placeholder="Password"
          className="form-control"
          style={{ marginTop: '10px' }}
        />
        <div style={{ textAlign: 'center' }}>
          <Button
            type="submit"
            disabled={submitting}
            className={css(styles.button)}
          >
            {submitting ? 'Submitting . . .' : 'Sign In'}
          </Button>
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
};


export default reduxForm({
  form: 'signin',
  validate,
})(SigninForm);
