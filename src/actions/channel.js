
import { Socket } from 'phoenix';
//  import api from '../api';

const API_URL = process.env.REACT_APP_API_URL;
const SOCKET_URL = API_URL.replace(/(https|http)/, 'ws').replace('/api/0', ''); // is this necessary?

export function connectToChannel(dispatch) {
  console.log("in connect to channel");

  const token = JSON.parse(localStorage.getItem('token'));
  console.log('about to create socket');
  const socket = new Socket(`${SOCKET_URL}/socket`, {
    params: { token },
  });

  console.log('created socket');

  socket.connect();
  console.log('socket connected');

  const channel = socket.channel('market_data:all');
  console.log('channel', channel);
  channel.join()
    .receive('ok', (resp) => { console.log('channel_joined', resp); })
    .receive('error', (resp) => { console.log('channel_join_error', resp); });

  channel.on('market_data', (msg) => {
    console.log('market_data', msg);
  });
  //dispatch({ type: 'TEST' });
  //  TODO probably dispatch differently based on receives
}

export default connectToChannel;
