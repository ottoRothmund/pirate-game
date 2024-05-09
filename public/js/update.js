// update.js

export function update(scene) {
  const { player, cursors } = scene;

  // Handle player movement
  if (cursors.up.isDown) {
    // Accelerate in the direction the ship is facing (slower acceleration)
    scene.physics.velocityFromRotation(
      player.rotation,
      200,
      player.body.acceleration
    );
  } else {
    // Slow down if not accelerating (higher inertia)
    player.body.setAcceleration(0);
    // Increase the rate of deceleration
    player.body.damping = 0.9; // Adjust damping value as needed
  }

  // Limit maximum speed
  const maxSpeed = 300; // Adjust as needed
  const currentSpeed = player.body.velocity.length();
  if (currentSpeed > maxSpeed) {
    player.body.velocity.scale(maxSpeed / currentSpeed);
  }

  // Handle rotation
  if (cursors.left.isDown) {
    player.setAngularVelocity(-100); // Reduced rotation speed
  } else if (cursors.right.isDown) {
    player.setAngularVelocity(100); // Reduced rotation speed
  } else {
    player.setAngularVelocity(0);
  }

  // Teleport to opposite side if going out of bounds
  scene.physics.world.wrap(player, 5);

  // Emit movement data
  const movement = {
    x: player.x,
    y: player.y,
    angle: player.angle,
  };
  // Emitting movement data to the server
  socket.emit("playerMovement", movement);
}
