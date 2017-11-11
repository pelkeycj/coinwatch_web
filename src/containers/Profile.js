//  @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';
import Navbar from './Navbar';

type Props = {
  currentUser: Object,
  isAuthenticated: boolean,
};

class Profile extends React.Component {
    static contextTypes = {
      router: PropTypes.object,
    };


    props: Props

//  TODO need to be able to edit/delete
//  TODO do we want to render different components based on click?

    render() {
      const { currentUser, isAuthenticated } = this.props;
      return (
        <div>
          <Navbar />
          {isAuthenticated &&
            <div>
              <div style={{ display: 'inline' }}>
                <h1>Profile</h1>
                <Link to="profile/edit" component={EditProfile}>edit</Link>
              </div>
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
