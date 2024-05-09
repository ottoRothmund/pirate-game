// socketHandler.js

// Function to set up Socket.IO handling
export function setupSocket(socket, scene) {
  // Listen for 'currentPlayers' event to handle existing players
  socket.on("currentPlayers", (players) => {
    Object.keys(players).forEach((id) => {
      if (id !== socket.id) {
        addOtherPlayer(scene, players[id]);
      }
    });
  });

  // Listen for 'newPlayer' event to handle new player joining
  socket.on("newPlayer", (playerInfo) => {
    addOtherPlayer(scene, playerInfo);
  });

  // Listen for 'playerMoved' event to handle player movement
  socket.on("playerMoved", (playerInfo) => {
    if (scene.otherPlayers[playerInfo.id]) {
      scene.otherPlayers[playerInfo.id].x = playerInfo.x;
      scene.otherPlayers[playerInfo.id].y = playerInfo.y;
      scene.otherPlayers[playerInfo.id].angle = playerInfo.angle;
    }
  });

  // Listen for 'playerDisconnected' event to handle player disconnection
  socket.on("playerDisconnected", (id) => {
    if (scene.otherPlayers[id]) {
      scene.otherPlayers[id].destroy();
      delete scene.otherPlayers[id];
    }
  });
}

// Function to add other player to the scene
function addOtherPlayer(scene, playerInfo) {
  const otherPlayer = scene.physics.add
    .sprite(playerInfo.x, playerInfo.y, "ship")
    .setOrigin(0.5, 0.5)
    .setScale(0.5);
  otherPlayer.id = playerInfo.id;
  scene.otherPlayers[playerInfo.id] = otherPlayer;
}
