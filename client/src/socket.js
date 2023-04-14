import { io } from 'socket.io-client';
import { baseUrl } from './url';
const URL = baseUrl
const socket = io.connect(URL);

export default socket