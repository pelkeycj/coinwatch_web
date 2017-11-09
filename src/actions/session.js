import React from 'react';
import { reset } from 'redux-form';
import api from '../api';
import { Redirect } from 'react-router-dom';

function setCurrentUser(dispatch, resp) {
  localStorage.setItem('token', JSON.stringify(resp.meta.token));
  dispatch({ type: 'AUTH_SUCCESS', resp });
}

export function signin(data, router) {
  return dispatch => api.post('/session', data)
    .then((resp) => {
      setCurrentUser(dispatch, resp);
      router.history.push('/')
    });
}

export function register(data, router) {
  return dispatch => api.post('/users', data)
    .then((resp) => {
      setCurrentUser(dispatch, resp);
      dispatch(reset('signup'));
      router.history.push('/');
    });
}

export function signout(router) {
  return dispatch => api.delete('/session')
    .then(() => {
      localStorage.removeItem('token');
      dispatch({ type: 'SIGNOUT' });
      router.history.push('/')
    });
}
