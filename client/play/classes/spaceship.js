class SpaceShip {
  constructor() {
    const img = new Image();
    img.src = "assets/pics/hero.png";
    this.image = img;
    this.spriteWidth = 401;
    this.spriteHeight = 317;
    this.width = 120;
    this.height = 120;
    this.x = 0;
    this.y = CANVAS_HEIGHT - this.width;
    this.fireCounter = 0;
    this.firingSpeed = 5+2*game.firingSpeed;
  }

  fireBullets(pressType = "press-and-hold") {
    if (pressType === "press-and-hold") {
      this.fireCounter += 1;
      if (this.fireCounter % this.firingSpeed == 0) {
        let x = this.x + this.width / 2 - 10;
        bullets.push(new Bullet(x, this.y));
      }
    } else {
      let x = this.x + this.width / 2 - 10;
      bullets.push(new Bullet(x, this.y));
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
