import { io } from 'socket.io-client';
import cc from '../../utils/constants';
var socket;
let connected = false;
const connect = (id) => {
    socket = io(cc.API_URL, {
        query: `user_id=${id}`,
    });
    if (connected) {
        socket.on('connect', function () {
            connected = socket.connected;
            const sessionID = socket.id; //
            console.log('SOCKET ID', sessionID);
        });
        // alert('connected');
        // console.log('socket', socket);
    }
};
const getSocket = () => {
    return socket;
};

export default { getSocket, connect };