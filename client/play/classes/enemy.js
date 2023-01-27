class Enemy {
  constructor(moveType = "zig-zag", x = null, y = null) {
    const img = new Image();
    img.src = "../assets/pics/enemy.png";
    this.image = img;
    this.spriteWidth = 431;
    this.spriteHeight = 431;
    this.width = this.height = 120;
    if (x === null) this.x = Math.random() * CANVAS_WIDTH;
    else this.x = x;
    if (y === null) this.y = -this.height;
    else this.y = y;
    this.horizontalSpeed = 4*((Math.random>0.5)?-1:1);
    this.downSpeed = 1+game.enemyDownSpeed;
    this.counter = 0;
    this.angle = 2;
    this.movementType = moveType;
  }

  update(idx) {
    if (game.gameSpeed == 0) return;
    if (this.movementType === "zig-zag") {
      // movement - 1 : zigzag
      this.x += 1 * this.horizontalSpeed;
      if (this.x + this.width >= CANVAS_WIDTH || this.x < 0) {
        this.horizontalSpeed *= -1;
      }
      this.y += 1 * this.downSpeed;
    } else if (this.movementType === "sine-wave") {
      //movement - 2 : sin wave
      this.x += 5 * Math.sin((this.angle * Math.PI) / 90);
      this.angle += 1;
      this.y += 1 * this.downSpeed;
    }

    //if enemy goes out of canvas remove it
    if (this.x > CANVAS_WIDTH || this.x + this.width < 0) {
      enemies.splice(idx, 1);
    }

    // check for game-over after very update
    this.#isGameOver();
  }

  #isGameOver() {
    // check if the enemy touches the canvas border in downside
    if (this.y + this.height > CANVAS_HEIGHT) {
      game.doGameOver();
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
