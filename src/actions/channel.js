
import { Socket } from 'phoenix';

const API_URL = process.env.REACT_APP_API_URL;
const SOCKET_URL = API_URL.replace(/(https|http)/, 'ws').replace('/api/0', ''); // is this necessary?


export function connectToChannel() {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const socket = new Socket(`${SOCKET_URL}/socket`, {
      params: { token },
    });
    socket.connect();

    const channel = socket.channel('market_data:all');
    channel.join()
      .receive('ok', (resp) => { dispatch({ type: 'CHANNEL_JOIN_SUCCESS', resp }); })
      .receive('error', (resp) => { dispatch({ type: 'CHANNEL_JOIN_ERROR', resp }); });

    channel.on('market_data', (resp) => { dispatch({ type: 'NEW_MARKET_DATA', resp }); });
  };
}

export default connectToChannel;
