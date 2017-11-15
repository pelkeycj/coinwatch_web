import api from '../api';

export function addWatching(data) {
  return dispatch => api.post('/market_user', data)
    .then((resp) => {
      console.log('resp', resp);
      dispatch({ type: 'SET_USER', resp });
    });
}

export function removeWatching(data) {
  return dispatch => api.delete('/market_user', data)
    .then((resp) => {
      console.log('resp', resp);
      dispatch({ type: 'SET_USER', resp });
    });
}
