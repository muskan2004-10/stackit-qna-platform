import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST']
    }
  });
  
  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('join', (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  
  return io;
};

export const publish = (event, data) => {
  if (!io) throw new Error('Socket.io not initialized');
  io.emit(event, data);
};

export const notifyUser = (userId, notification) => {
  if (!io) throw new Error('Socket.io not initialized');
  io.to(`user_${userId}`).emit('notification', notification);
};