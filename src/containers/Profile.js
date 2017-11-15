//  @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import { Row, Col } from 'react-grid-system';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Colors from '../static/Colors';

type Props = {
  currentUser: Object,
  isAuthenticated: boolean,
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '800px',
    height: '500px',
    padding: '15rem 4rem',
    margin: 'auto',
  },
  button: {
    borderRadius: '25px',
    borderColor: Colors.primary,
    color: Colors.primary,
    background: 'white',
    marginTop: '10px',
    ':hover': {
      color: 'white',
      background: Colors.primary,
    },
  },
});

class Profile extends React.Component {
    static contextTypes = {
      router: PropTypes.object,
    };


    props: Props

    render() {
      const { currentUser, isAuthenticated } = this.props;
      return (
        <div>
          <Navigation />
          {isAuthenticated &&
            <div className={css(styles.container)}>
              <Row align="center" >
                <Col md={6} offset={{ md: 3 }} style={{ textAlign: 'center' }}>
                  <h1>Your Profile</h1>
                </Col>
                <Col md={3}>
                  <Link to="/profile/edit">
                    <Button type="submit" onClick={this.handleDelete} className={css(styles.button)}>
                      Edit
                    </Button>
                  </Link>
                </Col>
              </Row>
              <h3>Username: {currentUser.username}</h3>
              <h3>Email: {currentUser.email}</h3>
            </div>
          }
        </div>
      );
    }
}

export default connect(
  state => ({
    currentUser: state.session.currentUser,
    isAuthenticated: state.session.isAuthenticated,
  }),
  null,
)(Profile);
