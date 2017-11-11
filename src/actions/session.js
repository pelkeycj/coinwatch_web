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
  return dispatch => api.delete('/session')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'SIGNOUT' });
      router.history.push('/');
    });
}

export function editUser(data, router) {
  console.log('editing action', data);
  return dispatch => api.patch('/users', data)
    .then((resp) => {
      console.log('updated user', resp);
      setCurrentUser(dispatch, resp);
      dispatch(reset('edit_profile'));
      router.history.push('/profile');
    });
}

export function deleteUser(data, router) {
  console.log('deleting . . .');
  const url = `/users/${data.id}`;
  return dispatch => api.delete(url)
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'SIGNOUT' });
      router.history.push('/');
    });
}
