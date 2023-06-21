import { io } from "socket.io-client";

const socket = io('http://www.actore.store', {
    autoConnect: false,
});

socket.on('user:session', session => {
    localStorage.setItem('Session', JSON.stringify(session));
});

socket.on('user:allUsers', users => {
    console.log(users);
});

socket.on('user:connected', user => {
});

socket.on('user:disconnected', user => {
});

export default socket;