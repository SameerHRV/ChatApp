import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import logger from '../utils/logger';
import env from '../config/env.config';

export class SocketService {
  private io: Server | null = null;

  init(server: HttpServer): Server {
    this.io = new Server(server, {
      cors: {
        origin: env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
      },
    });

    logger.info('🔌 Socket.io server initialized');

    this.io.on('connection', (socket: Socket) => {
      logger.info(`Socket connected: ${socket.id}`);

      // Handle room events
      socket.on('join_room', (roomId: string) => {
        socket.join(roomId);
        logger.info(`User ${socket.id} joined room ${roomId}`);
      });

      // Handle message events
      socket.on('send_message', (data: { roomId: string; message: string; senderId: string }) => {
        socket.to(data.roomId).emit('receive_message', data);
        logger.debug(`Message sent in room ${data.roomId} by ${data.senderId}`);
      });

      socket.on('disconnect', () => {
        logger.info(`Socket disconnected: ${socket.id}`);
      });
    });

    return this.io;
  }

  getIO(): Server {
    if (!this.io) {
      throw new Error('Socket.io not initialized!');
    }
    return this.io;
  }
}

export const socketService = new SocketService();
export default socketService;
