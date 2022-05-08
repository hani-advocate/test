import {SOCKET_HOST} from '@constants/APIs';
import socketIOClient from 'socket.io-client';
// import {updateChat} from '@root/Actions/chats.actions';
import reactotron from 'reactotron-react-native';

export class Socket {
  constructor() {
    // return;
    this.socket = socketIOClient(SOCKET_HOST, {
      jsonp: false,
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: Infinity,
    });
    this.connected = false;
    this.currentRoom = null;
  }

  async initialize(dispatch) {
    // return;
    if (this.connected) {
      return;
    }
    this.socket.connect();
    this.connected = true;
    this.socket.on('connect', (data) => {
      console.log('connection established successfully!!', data);
    });
    this.socket.on('disconnect', () => {
      console.log('connection disconnecting');
    });
    // this.socket.on('updateChat', (message) => {
    //   dispatch(updateChat(message));
    // });
    this.socket.on('error', (error) => {
      console.log({error});
      reactotron.log({error});
    });
    this.socket.on('connect_error', (e) => {
      console.log(e);
      reactotron.log({e});
    });
  }

  reset() {
    this.currentRoom = undefined;
  }

  joinRoom(orderId, userId) {
    if (orderId === this.currentRoom) {
      return;
    }
    console.log('join', {
      orderId,
      userId,
    });
    this.currentRoom = orderId;
    this.socket.emit('joinChat', {orderId, userId});
  }
  sendMessage(data) {
    console.log('send message', data);
    this.socket.emit('newMessage', data);
  }
}

const socket = new Socket();

export default socket;
