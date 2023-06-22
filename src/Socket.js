import { io } from "socket.io-client";

const socket = io('http://www.actore.store', {
    autoConnect: false,
});

socket.on('user:session', session => {
    localStorage.setItem('Session', JSON.stringify(session));
});

export default socket;