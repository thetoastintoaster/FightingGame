// "use strict";
// GAME START

function gameStart() {
  function r() {
    introCredit1.classList.remove("hidden");
  }
  setTimeout(r, 500);
}

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

function animate() {
  window.requestAnimationFrame(animate);
  // countDownTimer.classList.remove("hidden");

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  shop.update();
  background.update();
  player.update();
  player2.update();

  player.velocity.x = 0;
  player2.velocity.x = 0;

  // player left and right movement & animation
  if (keys.a.pressed && player.lastKey === "a") {
    // move to the left
    player.velocity.x = -3.5;
    // running animation for player 1
    player.spriteSwap("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    // move to the right
    player.velocity.x = 3.5;
    // running animation for player 1
    player.spriteSwap("run");
  } else {
    player.spriteSwap("idle");
  }

  // player jump movement & animation
  if (player.velocity.y < 0) {
    player.spriteSwap("jump");
  } else if (player.velocity.y > 0) {
    player.spriteSwap("fall");
  }

  // player 2
  player2.velocity.x = 0;

  if (keys.ArrowLeft.pressed && player2.lastKey === "ArrowLeft") {
    player2.velocity.x = -2.5;
    player2.spriteSwap("run");
  } else if (keys.ArrowRight.pressed && player2.lastKey === "ArrowRight") {
    player2.velocity.x = 2.5;
    player2.spriteSwap("run");
  } else {
    player2.spriteSwap("idle");
  }
  // player jump movement & animation
  if (player2.velocity.y < 0) {
    player2.spriteSwap("jump");
  } else if (player2.velocity.y > 0) {
    player2.spriteSwap("fall");
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
