class Star {
  constructor() {
    this.x = Math.random() * CANVAS_WIDTH;
    this.y = Math.random() * CANVAS_HEIGHT;
    this.width = this.height = Math.random() * 5;
    this.opacity = Math.random() * (1 - 0.5) + 0.5;
  }

  draw() {
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
