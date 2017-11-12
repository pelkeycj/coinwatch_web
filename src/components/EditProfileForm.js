//  @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite';
import Input from './Input';

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
  currentUser: Object,
}

class EditProfileForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  props: Props

  handleSubmit(data) {
    this.props.onSubmit(data);
  }

  render() {
    const { handleSubmit, submitting, currentUser } = this.props;

    return (
      <form className={css(styles.card)} onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          name="username"
          type="text"
          component={Input}
          placeholder="username"
          className="form-control"
          value={currentUser.username}
        />
        <Field
          name="email"
          type="email"
          component={Input}
          placeholder="email"
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
          {submitting ? 'Submitting . . .' : 'Submit'}
        </button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match';
  }
};


export default reduxForm({
  form: 'edit_profile',
  validate,
})(EditProfileForm);
