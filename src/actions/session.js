import { reset } from 'redux-form';
import api from '../api';

function setCurrentUser(dispatch, resp) {
  localStorage.setItem('token', JSON.stringify(resp.meta.token));
  dispatch({ type: 'AUTH_SUCCESS', resp });
}

export function authenticate(data) {
  return dispatch => api.post('/session/refresh', data)
    .then((resp) => {
      setCurrentUser(dispatch, resp);
    });
}

export function signin(data, router) {
  return dispatch => api.post('/session', data)
    .then((resp) => {
      setCurrentUser(dispatch, resp);
      router.history.push('/');
    });
}

export function register(data, router) {
  return dispatch => api.post('/users', data)
    .then((resp) => {
      setCurrentUser(dispatch, resp);
      dispatch(reset('register'));
      router.history.push('/');
    });
}

export function signout(router) {
  console.log('signing out');
  return dispatch => api.delete('/session')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'SIGNOUT' });
      router.history.push('/');
      console.log('signed out');
    });
}

export function editUser(data, router) {
  const url = `/users/${data.id}`;
  return dispatch => api.patch(url, data)
    .then((resp) => {
      console.log('updated user', resp);
      dispatch({ type: 'AUTH_SUCCESS', resp });
      dispatch(reset('edit_profile'));
      router.history.push('/profile');
      alert('Updated successfully.');
    });
}

//  TODO using dispatch here is causing it to not work?
export function deleteUser(data, router) {
  const url = `/users/${data.id}`;
  return dispatch => api.delete(url, data)
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'SIGNOUT' });
      router.history.push('/');
      alert('Deleted successfully');
    })
}
