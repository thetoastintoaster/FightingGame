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
