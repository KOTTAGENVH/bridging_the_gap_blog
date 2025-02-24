import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import productResolvers from './graphql/resolvers/product_resolvers.js';
import userResolvers from './graphql/resolvers/user_resolvers.js';
import product_typeDefs from './graphql/typedef/product_typeDef.js';
import user_typeDefs from './graphql/typedef/user_typeDef.js';
import bodyParser from 'body-parser';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import productsRouter from './router/productsRouter.js';

dotenv.config({ path: '.env.local' });
const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(bodyParser.json());

// Create an HTTP server using the Express app
const httpServer = http.createServer(app);

// Initialize Socket.IO with a custom path for websockets
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  path: '/websockets'
});

// Utility function to retrieve available rooms (excluding individual socket rooms)
const getAvailableRooms = () => {
  const rooms: string[] = [];
  for (const [key] of io.sockets.adapter.rooms.entries()) {
    // if the room key is not a socket id then it’s an actual room
    if (!io.sockets.adapter.sids.has(key)) {
      rooms.push(key);
    }
  }
  return rooms;
};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Send initial rooms list to the connected socket
  socket.emit("rooms_list", getAvailableRooms());

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
    // Broadcast updated list of rooms to all clients
    io.emit("rooms_list", getAvailableRooms());
  });

  socket.on("leave_room", (room) => {
    socket.leave(room);
    console.log(`Socket ${socket.id} left room ${room}`);
    io.emit("rooms_list", getAvailableRooms());
  });

  // Allow a client to request the rooms list manually
  socket.on("get_rooms", () => {
    socket.emit("rooms_list", getAvailableRooms());
  });

  socket.on("send_message", (data) => {
    // Send to all sockets in the specific room except sender
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("send_message_all", (data) => {
    // Broadcast message to all connected clients (including sender)
    io.emit("receive_message", data);
  });
});

// Merge GraphQL type definitions and resolvers
const typeDefs = mergeTypeDefs([product_typeDefs, user_typeDefs]);
const resolvers = mergeResolvers([productResolvers, userResolvers]);

// Create an Apollo Server instance with the unified schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async function startServer() {
  await server.start();

  app.use(
    '/graphql',
    bodyParser.json(),
    expressMiddleware(server)
  );

  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  //Api routes
  app.use('/api', productsRouter);

  httpServer.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
})();
