// wrappers for fetch methods

const API = process.env.REACT_APP_API_URL;

function headers() {
  const token = JSON.parse(localStorage.getItem('token'));
  const auth = 'Bearer: '.concat(token);
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: auth,
  };
}

function parseResponse(resp) {
  return resp.json().then((json) => {
    if (!resp.ok) {
      return Promise.reject(json);
    }
    return json;
  });
}


function queryString(params) {
  const query = Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return `${query.length ? '?' : ''}${query}`;
}

export default {
  get(url, params = {}) {
    return fetch(`${API}${url}${queryString(params)}`, {
      method: 'GET',
      headers: headers(),
    })
      .then(parseResponse);
  },

  post(url, data) {
    const body = JSON.stringify(data);

    return fetch(`${API}${url}`, {
      method: 'POST',
      headers: headers(),
      body,
    })
      .then(parseResponse);
  },

  delete(url) {
    return fetch(`${API}${url}`, {
      method: 'DELETE',
      headers: headers(),
    })
      .then(parseResponse);
  },
};
