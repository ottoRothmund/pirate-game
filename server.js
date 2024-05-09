// Import necessary modules
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Create an Express app and an HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Store all connected players
const players = {};

// Handle new socket connections
io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Create a new player object for this connection
  players[socket.id] = {
    id: socket.id,
    x: Math.floor(Math.random() * 800), // Random starting position
    y: Math.floor(Math.random() * 600),
    angle: 0,
  };

  // Send the current players to the newly connected client
  socket.emit("currentPlayers", players);

  // Broadcast to other clients that a new player has joined
  socket.broadcast.emit("newPlayer", players[socket.id]);

  // Listen for player movement events and update the player data
  socket.on("playerMovement", (movementData) => {
    const player = players[socket.id] || {};
    player.x = movementData.x;
    player.y = movementData.y;
    player.angle = movementData.angle;

    // Broadcast updated player data to other clients
    socket.broadcast.emit("playerMoved", player);
  });

  // Handle player disconnection and remove from the player list
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit("playerDisconnected", socket.id);
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
