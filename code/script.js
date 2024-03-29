// "use strict";

gameContainer.width = 1280;
gameContainer.height = 720;
canvas.width = 1280;
canvas.height = 720;

// canvas.width = 1024;
// canvas.height = 576;

// This is used to fill in the canvas with the color black
// so we can see it
context.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

// Background sprite
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/foreground.png",
  scale: 3.75,
});

// Extra sprites to compliment the background
const shop = new Sprite({
  position: {
    x: 400,
    y: 228,
  },
  imageSrc: "./assets/shop.png",
  scale: 2.5,
  framesMax: 6,
});

const player = new Fighter({
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
  imageSrc: "./assets/samuraiMack/Idle.png",
  framesMax: 8,
  scale: 3,
  offset: {
    x: 215,
    y: 157,
  },
  sprites: {
    idle: {
      imageSrc: "./assets/samuraiMack/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./assets/samuraiMack/Run.png",
      framesMax: 8,
      image: new Image(),
    },
    jump: {
      imageSrc: "./assets/samuraiMack/Jump.png",
      framesMax: 2,
      image: new Image(),
    },
    fall: {
      imageSrc: "./assets/samuraiMack/Fall.png",
      framesMax: 2,
      image: new Image(),
    },
    attack: {
      imageSrc: "./assets/samuraiMack/Attack1.png",
      framesMax: 6,
      image: new Image(),
    },
  },
  hitBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 100,
    height: 50,
  },
});

const player2 = new Fighter({
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
  imageSrc: "./assets/samuraiMack/Idle.png",
  framesMax: 8,
  scale: 3,
  offset: {
    x: 215,
    y: 157,
  },
  sprites: {
    idle: {
      imageSrc: "./assets/samuraiMack/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./assets/samuraiMack/Run.png",
      framesMax: 8,
      image: new Image(),
    },
    jump: {
      imageSrc: "./assets/samuraiMack/Jump.png",
      framesMax: 2,
      image: new Image(),
    },
    fall: {
      imageSrc: "./assets/samuraiMack/Fall.png",
      framesMax: 2,
      image: new Image(),
    },
    attack: {
      imageSrc: "./assets/samuraiMack/Attack1.png",
      framesMax: 6,
      image: new Image(),
    },
  },
  hitBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 100,
    height: 50,
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

// Intro Credits + load main menu
gameStart();

mainMenuStart.addEventListener("click", function () {
  mainMenu.classList.add("hidden");
  // countDownTimer.classList.remove("hidden");
  inGameGUI.classList.remove("hidden");

  fightingGame.classList.remove("hidden");
  animate();
});
// decreaseTimer();

// Controls
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
