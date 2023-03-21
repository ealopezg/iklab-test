import { io } from 'socket.io-client'

const baseUrl = 'https://ikcount.com'


class SocketService {
    socket;
    constructor() { };
    setupSocketConnection(token) {
        this.socket = io(`${baseUrl}/live?atoken=${token}`, { transports: ['polling'] })
        return this.socket;
    }
}

export default new SocketService();