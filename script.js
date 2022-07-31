const canvas = document.querySelector("canvas");

// You need the getContext() method here so you have access to
// the canvas tags 2d drawing functions
// You also need it so that the sprites spawn within the canvas
// and not outside of it (the body element)
const context = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

// canvas.width = 1024;
// canvas.height = 576;

// This is used to fill in the canvas with the color black
// so we can see it
context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

class Sprite {
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.color = color;
    this.isAttacking;
    this.health = 100;
    //for attacks
    this.hitBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: offset,
      width: 100,
      height: 50,
    };
  }

  // This method is used to create the hurtbox at the players spawn position
  draw() {
    // context.fillStyle = "red";
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);

    // hitbox (for attacks)
    if (this.isAttacking) {
      context.fillStyle = "green";
      context.fillRect(
        this.hitBox.position.x,
        this.hitBox.position.y,
        this.hitBox.width,
        this.hitBox.height
      );
    }
  }

  // this method is to update the player when movement buttons are pressed
  update() {
    this.draw();
    this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
    this.hitBox.position.y = this.position.y;

    this.position.x += this.velocity.x;

    // This will apply gravity to the object for the duration of it being above the ground
    // position.y will have [insert number] pixels added on to it for each frame that is looped over
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  // this method is to allow player1 to attack at the moment
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
});

const player2 = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "purple",
  offset: {
    x: -50,
    y: 0,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

// Collision Detection
function hurtboxCollision({ rect1, rect2 }) {
  if (
    // X axis
    rect1.hitBox.position.x + rect1.hitBox.width >= rect2.position.x &&
    rect1.hitBox.position.x <= rect2.position.x + rect2.width &&
    // y axis
    rect1.hitBox.position.y + rect1.hitBox.height >= rect2.position.y &&
    rect1.hitBox.position.y <= rect2.position.y + rect2.height
  ) {
    return true;
  }
}

function determineWinner({ player, player2, timerID }) {
  clearTimeout(timerID);
  document.querySelector("#displayText").style.display = "flex";
  if (player.health === player2.health) {
    document.querySelector("#displayText").innerHTML = "Tie";
  } else if (player.health > player2.health) {
    document.querySelector("#displayText").innerHTML = "Player 1 Wins";
  } else if (player2.health > player.health) {
    document.querySelector("#displayText").innerHTML = "Player 2 Wins";
  }
}

// This is for the timer.
// If player1 has a higher HP, player1 wins and vice versa.
// If the HP's of both players
let timer = 10;
let timerID;
function decreaseTimer() {
  timerID = setTimeout(decreaseTimer, 1000);
  if (timer > 0) {
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer === 0) {
    determineWinner({ player, player2, timerID });
  }
}

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  player2.update();

  // player
  player.velocity.x = 0;

  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -2.5;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 2.5;
  }

  // player 2
  player2.velocity.x = 0;

  if (keys.ArrowLeft.pressed && player2.lastKey === "ArrowLeft") {
    player2.velocity.x = -2.5;
  } else if (keys.ArrowRight.pressed && player2.lastKey === "ArrowRight") {
    player2.velocity.x = 2.5;
  }

  // If player1 attacks and the attack collides with player2's hurtbox
  // do [insert task]
  if (
    hurtboxCollision({
      rect1: player,
      rect2: player2,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    player2.health -= 20;
    document.querySelector("#player2HP").style.width = player2.health + "%";
  }

  // If player2 attacks and the attack collides with player1's hurtbox
  // do [insert task]
  if (
    hurtboxCollision({
      rect1: player2,
      rect2: player,
    }) &&
    player2.isAttacking
  ) {
    player2.isAttacking = false;
    player.health -= 20;
    document.querySelector("#playerHP").style.width = player.health + "%";
  }

  // If the HP of either player reaches zero, end the game
  if (player.health <= 0 || player2.health <= 0) {
    determineWinner({ player, player2, timerID });
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      player.velocity.y = -11.5;
      break;
    case " ":
      player.attack();
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      player2.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      player2.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      // keys.ArrowUp.pressed = true;
      player2.velocity.y = -11.5;
      player2.lastKey = "ArrowUp";
      break;
    case "m":
      player2.attack();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }

  // player2
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
