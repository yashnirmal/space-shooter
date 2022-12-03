class Bullet {
  constructor(x, y) {
    this.width = 20;
    this.height = 20;
    this.speed = 1;
    this.direction = "up";
    this.color = "fff";
    this.speed = 5;
    this.x = x;
    this.y = y;
  }

  update(idx) {
    this.y -= 1 * this.speed* game.gameSpeed;
    // remove the bullet if it passes the canvas
    if (this.y+this.height< 0) bullets.splice(idx, 1);
  }

  draw() {
    ctx.fillStyle = "#" + this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
