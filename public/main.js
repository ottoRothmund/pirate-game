// main.js
import { preload } from "./js/preload.js";
import { create } from "./js/create.js";
import { update } from "./js/update.js";
import { setupSocket } from "./js/socketHandler.js";

const socket = io();

// Initialize Phaser game
const config = {
  mode: Phaser.Scale.Fit,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: {
    preload: function () {
      preload(this);
    },
    create: function () {
      create(this);
    },
    update: function () {
      update(this);
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false, // Set to true for debugging physics
    },
  },
};

const game = new Phaser.Game(config);

// Setup socket handling
setupSocket(socket, game.scene.scenes[0]);
