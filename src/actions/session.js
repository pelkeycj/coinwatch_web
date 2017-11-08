import { reset } from 'redux-form';
import api from '../api';

function setCurrentUser(dispatch, resp) {
  localStorage.setItem('token', JSON.stringify(resp.meta.token));
  dispatch({ type: 'AUTH_SUCCESS', resp });
}

export function signin(data, router) {
  return dispatch => api.post('/session', data)
    .then((resp) => {
      setCurrentUser(dispatch, resp);
      dispatch(reset('signin'));
      router.transitionTo('/'); //  TODO  change to watching page?
    });
}

export function signup(data, router) {
  return dispatch => api.post('/users', data)
    .then((resp) => {
      setCurrentUser(dispatch, resp);
      dispatch(reset('signup'));
      router.transitionTo('/'); //  TODO change to watching page?
    });
}

export function signout(router) {
  return dispatch => api.delete('/session')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'SIGNOUT' });
      router.transitionTo('/');
    });
}
