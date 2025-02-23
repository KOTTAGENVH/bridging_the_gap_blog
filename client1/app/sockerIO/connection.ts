import io from "socket.io-client";

// Connect to the server on port 5050 with the custom path
const socket = io("http://localhost:5050", { path: '/websockets' });


export { socket };