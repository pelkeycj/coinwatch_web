//  @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-grid-system';
import Input from './Input';
import Colors from '../static/Colors';

const styles = StyleSheet.create({
  card: {
    maxWidth: '600px',
    height: '800px',
    padding: '15rem 4rem',
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

  btn_danger: {
    marginTop: '10px',
    borderRadius: '25px',
    borderColor: Colors.danger,
    color: Colors.danger,
    background: 'white',
    ':hover': {
      color: 'black',
      background: Colors.danger,
    },
  },
});

type Props = {
  onDelete: () => void,
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
  currentUser: Object,
}

class EditProfileForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  props: Props

  handleSubmit(data) {
    this.props.onSubmit(data);
  }

  handleDelete() {
    this.props.onDelete();
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form className={css(styles.card)} onSubmit={handleSubmit(this.handleSubmit)}>
        <Row align="center" >
          <Col md={6} offset={{ md: 3 }} style={{ textAlign: 'center' }}>
            <h1>Edit Profile</h1>
          </Col>
          <Col md={3}>
            <Button type="submit" onClick={this.handleDelete} className={css(styles.btn_danger)}>
              Delete
            </Button>
          </Col>
        </Row>

        <p>Edit desired fields and submit.</p>
        <Field
          name="username"
          type="text"
          component={Input}
          placeholder="username"
          className="form-control"
          style={{ marginTop: '10px' }}
        />
        <Field
          name="email"
          type="email"
          component={Input}
          placeholder="email"
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
        <Field
          name="password_confirmation"
          type="password"
          component={Input}
          placeholder="Confirm Password"
          className="form-control"
          style={{ marginTop: '10px' }}
        />
        <div style={{ textAlign: 'center' }}>
          <Button
            type="submit"
            disabled={submitting}
            className={css(styles.button)}
          >
            {submitting ? 'Submitting . . .' : 'Submit'}
          </Button>
        </div>
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
