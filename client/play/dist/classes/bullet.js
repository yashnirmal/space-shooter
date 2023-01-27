class Bullet {
  constructor(x, y) {
    this.width = 20;
    this.height = 30;
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
    // ctx.fillStyle = "#" + this.color;
    let gradient = ctx.createLinearGradient(this.x,this.y,this.x,this.y+this.width)
    gradient.addColorStop(0,"#fff")
    gradient.addColorStop(0.6, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1,"rgba(255,255,255,0.2)")
    ctx.fillStyle = gradient
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
