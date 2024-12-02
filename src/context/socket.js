import { io } from "socket.io-client";

// Initialize the socket instance
const socketConnection = io("http://localhost:3001"); // Replace with your server URL

export default socketConnection;