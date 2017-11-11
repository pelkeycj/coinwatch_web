//  @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditProfileForm from '../components/EditProfileForm';
import Navbar from './Navbar';
import { deleteUser, editUser } from '../actions/session';

type Props = {
  deleteUser: () => void,
  editUser: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
}

class EditProfile extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  props: Props

  handleDelete() {
    const data = {
      id: this.props.currentUser.id,
    }
    deleteUser(data, this.context.router);
  }

  handleEdit(params) {
    const data = {
      id: this.props.currentUser.id,
      user: params,
    };
    console.log('editing. . . ', data);
    editUser(data, this.context.router)
  }

  render() {
    const { currentUser, isAuthenticated } = this.props;

    return (
      <div>
        <Navbar />
        <h1>Edit Profile</h1>
        {isAuthenticated &&
          <div>
            <button type="button" onClick={this.handleDelete}>Delete Account</button>
            <EditProfileForm onSubmit={this.handleEdit} currentUser={currentUser} />
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
  { editUser, deleteUser },
)(EditProfile)
