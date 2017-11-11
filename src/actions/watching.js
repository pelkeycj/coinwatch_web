import api from '../api';

export function addWatching(data) {
  return dispatch => api.post('/watching', data)
    .then((resp) => {
      console.log('watched', resp);
      dispatch({ type: 'ADD_WATCHING', resp });
    });
}

export function removeWatching(data) {
  return dispatch => api.delete('/watching', data)
    .then((resp) => {
      console.log('unwatched', resp);
      dispatch({ type: 'REMOVE_WATCHING', resp });
    });
}
