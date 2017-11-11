import api from '../api';

export function addWatching(data) {
  return dispatch => api.post('/market_user', { market_user: data })
    .then((resp) => {
      console.log('watched', resp);
      dispatch({ type: 'ADD_WATCHING', resp });
    });
}

export function removeWatching(data) {
  return dispatch => api.delete('/market_user', { market_user: data })
    .then((resp) => {
      console.log('unwatched', resp);
      dispatch({ type: 'REMOVE_WATCHING', resp });
    });
}
