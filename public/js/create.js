// create.js
export function create(scene) {
  // Add player
  scene.player = scene.physics.add
    .sprite(400, 300, "ship")
    .setOrigin(0.5, 0.5)
    .setScale(0.5);

  // Movement controls
  scene.cursors = scene.input.keyboard.createCursorKeys();
}
