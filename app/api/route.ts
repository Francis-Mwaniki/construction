// app/api/chat.js
import { Server, ServerOptions } from 'socket.io';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false, // Prevent Next.js from parsing request bodies
  },
};

export async function GET(req: { socket: { server: Partial<ServerOptions> | undefined; }; }) {
  const io = new Server(req.socket.server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chatMessage', (message) => {
      const room = socket.rooms.values().next().value;
      io.to(room).emit('chatMessage', message);
    });

    // Handle other socket events as needed
  });

  // Since this is an API route, return a response (even if empty)
  return NextResponse.next(); // Empty response to keep server-side process alive
}
