class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  // This method is used to create the hurtbox at the players spawn position
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }

  // this method is to update the player when movement buttons are pressed
  update() {
    this.draw();
  }
}

class Fighter {
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
