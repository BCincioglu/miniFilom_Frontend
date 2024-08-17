import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3339"; // Socket.io sunucu URL'sini buraya yazın
const socket = io(SOCKET_URL);

export default socket;
