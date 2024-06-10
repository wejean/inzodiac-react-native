import io from 'socket.io-client'
import config from './config'

import { APPEND_MESSAGE } from './redux/actions/message'

export let socket;

export const initalizeSocket = (userId, dispatch) => {
  socket = io(config.SERVER_SOCKET_URL);

  socket.on('connect', () => {
    socket.emit('init', userId)
  });

  socket.on("chat", data => {
    dispatch({
      type: APPEND_MESSAGE,
      payload: data
    });
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnect');
  });

  socket.on('subscription_id', (data) => {
    // resolve(data);
  });

  socket.on('error', (err) => {
    //showSnackbar("Socket error");
    // reject(err);
  });

  socket.on('connect_error', (err) => {
    //showSnackbar("Socket connect_error");
    // reject(err);
  });
}


