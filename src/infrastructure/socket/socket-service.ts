import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';

export class SocketService {
  private static instance: SocketServer;

  static init(server: HttpServer): SocketServer {
    this.instance = new SocketServer(server, {
      cors: {
        origin: '*', // Adjust for production
        methods: ['GET', 'POST'],
      },
    });

    this.instance.on('connection', (socket) => {
      console.log(`[socket]: Client connected: ${socket.id}`);
      socket.on('disconnect', () => {
        console.log(`[socket]: Client disconnected: ${socket.id}`);
      });
    });

    return this.instance;
  }

  static getInstance(): SocketServer {
    if (!this.instance) {
      throw new Error('Socket.io not initialized. Call init() first.');
    }
    return this.instance;
  }

  static emit(event: string, data: any) {
    if (this.instance) {
      this.instance.emit(event, data);
    }
  }
}
