class Explosion {
  constructor(x, y,gmOver=false) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.6;
    this.height = this.spriteHeight * 0.6;
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.frame = 0;
    this.slower = 0;
    this.image = new Image();
    this.image.src = "../assets/pics/boom.png";
    this.sound = new Audio();
    this.sound.src = "../assets/sounds/sfx/explosion.mp3";
    this.doGameOverWithThisExp = gmOver;
  }

  update(idx) {
    if (game.isSfxOn && this.frame === 0) {
      this.sound.play();
    }

    this.slower++;
    if (this.slower % 5 == 0) {
      if (this.frame < 5) this.frame++;
      else{
        if(this.doGameOverWithThisExp){
          game.doGameOver()
        }
        explosions.splice(idx, 1);
      } 
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
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
