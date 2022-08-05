// "use strict";

class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 7;
    this.offset = offset;
  }

  // This method is used to create the hurtbox at the players spawn position
  draw() {
    context.drawImage(
      this.image,
      (this.image.width / this.framesMax) * this.framesCurrent,
      0,

      //the framesMax variable is used to divide the sprite
      // by how many frames are used for the sprite
      // this is to prevent seeing each frame of the animation
      // on the screen
      this.image.width / this.framesMax,
      this.image.height,

      // these are for the image position, height, and width
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  // This method is for animating the sprites
  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      // the "-1" is there so that the background image doesn't
      // flicker (it flickers because the crop is
      // being moved by one frame. The issue here is
      // that the background image only has one frame
      // right now)
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }
  // this method is to update the player when movement buttons are pressed
  update() {
    this.draw();
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    hitBox = {
      offset: {},
      width: undefined,
      height: undefined,
    },

    // arguments inherited from Sprite class below
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    });
    // this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 7;
    this.sprites = sprites;

    //for attacks
    this.hitBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: hitBox.offset,
      width: hitBox.width,
      height: hitBox.height,
    };

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  // this method is to update the player when movement buttons are pressed
  update() {
    this.draw();
    this.animateFrames();

    // hitboxes
    this.hitBox.position.x = this.position.x + this.hitBox.offset.x;
    this.hitBox.position.y = this.position.y + this.hitBox.offset.y;

    // The Hurtbox
    // context.fillStyle = "red";
    // context.fillStyle = this.color;
    // context.fillRect(this.position.x, this.position.y, this.width, this.height);

    // hitbox (for attacks)
    if (this.isAttacking) {
      console.log(player);
      context.fillStyle = "green";
      context.fillRect(
        this.hitBox.position.x,
        this.hitBox.position.y,
        this.hitBox.width,
        this.hitBox.height
      );
    }

    this.position.x += this.velocity.x;

    // This will apply gravity to the object for the duration of it being above the ground
    // position.y will have [insert number] pixels added on to it for each frame that is looped over
    this.position.y += this.velocity.y;

    // gravity
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 85) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  // this method is to allow player1 & player 2 to attack
  attack() {
    this.spriteSwap("attack");
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  // This method is for swaping the sprites for the players
  // depending on their state
  spriteSwap(sprite) {
    // This if statement is to prevent the attack
    // animation from looping indefinitely
    if (
      this.image === this.sprites.attack.image &&
      this.framesCurrent < this.sprites.attack.framesMax - 1
    )
      return;
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack":
        if (this.image !== this.sprites.attack.image) {
          this.image = this.sprites.attack.image;
          this.framesMax = this.sprites.attack.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
        }
        break;
    }
  }
}
