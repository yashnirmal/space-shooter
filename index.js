const gameMenu = document.querySelector('.menu')
const startGameBtn = document.querySelector('#start-game-btn')
const resumeGameBtn = document.querySelector('#resume-game-btn')
const canvas = document.querySelector('#space-bg')
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height


class Game{
  constructor(){
    this.gameOver = true
    this.gameSpeed = 0
  }

  pauseGame(){
    this.gameSpeed = 0
    gameMenu.style.display = 'flex'
  }

  resumeGame(){
    game.gameSpeed = 1;
    game.gameOver = false;
    gameMenu.style.display = "none";
    animate();
  }

  gameOver(){
    this.gameOver = true
    this.gameSpeed = 0
    gameMenu.style.display = 'flex'
    bullets.splice(0,bullets.length)
    enemies.splice(0,enemies.length)
    explosions.splice(0,explosions.length)
    heroShip = null
  }

  startNewGame(){
    gameMenu.style.display = "flex";
    bullets.splice(0, bullets.length);
    enemies.splice(0, enemies.length);
    explosions.splice(0, explosions.length);
    heroShip = null;
    enemyWave1(1)
    heroShip = new SpaceShip()
    this.resumeGame();
  }

}

const game = new Game()

class SpaceShip{
    constructor(){
        const img = new Image()
        img.src = "./assets/hero.png"
        this.image = img
        this.spriteWidth = 401
        this.spriteHeight = 317
        this.width = 120
        this.height = 120
        this.x = 0
        this.y = CANVAS_HEIGHT-this.width
    }

    draw(){
      ctx.drawImage(this.image,0,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
    }
}


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
    if (this.y < 0) bullets.splice(idx, 1);
  }

  draw() {
    ctx.fillStyle = "#" + this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

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


class Enemy{
    constructor(moveType="zig-zag",x=null,y=null){
        const img= new Image()
        img.src = "./assets/enemy.png"
        this.image = img
        this.spriteWidth = 431
        this.spriteHeight = 431
        this.width = this.height = 120
        if(x===null) this.x = Math.random() * CANVAS_WIDTH;
        else this.x = x;
        if (y === null) this.y = -this.height;
        else this.y = y;
        this.horizontalSpeed = 4
        this.downSpeed = 2
        this.counter = 0
        this.angle = 2;
        this.movementType = moveType
    }

    update(){
        if(game.gameSpeed==0) return 
        if(this.movementType === 'zig-zag'){
            // movement - 1 : zigzag
            this.x+=1*this.horizontalSpeed
            if(this.x+this.width>=CANVAS_WIDTH || this.x<0){
                this.horizontalSpeed*=-1
            }
            this.y+=1*this.downSpeed
        }
        else if(this.movementType ==='sine-wave'){
            //movement - 2 : sin wave
            this.x += 5 * Math.sin((this.angle * Math.PI) / 90);
            this.angle += 1;
            this.y += 1 * this.downSpeed;
        }
        // check for game-over after very update
        this.#isGameOver()

    }

    #isGameOver(){
        // check if the enemy touches the canvas border in downside
        if(this.y+this.height>CANVAS_HEIGHT){
          game.gameOver()
        }
    }

    draw(){
        ctx.drawImage(this.image,0,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
    }
}

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 0.6;
    this.height = this.spriteHeight * 0.6;
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.frame = 0;
    this.slower = 0;
    this.image = new Image();
    this.image.src = "./assets/boom.png";
  }

  update(idx) {
    this.slower++;
    if (this.slower % 5 == 0) {
      if (this.frame < 5) this.frame++;
      else explosions.splice(idx,1)
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

function enemyWave1(n=5,movementType){
    // add enemies after 2 second time gap at random postions in canvas
    for(let i=0;i<n;i++){
        setTimeout(()=>{
            enemies.push(new Enemy(movementType));
        },2000*i)
    }
}

function enemyWave2(n = 5, movementType) {
  // add enemies after 2 second time gap at random postions in canvas
  let e = new Enemy(movementType);
  let startX = e.x
  let startY = e.y
  enemies.push(e)
  for (let i = 0; i < n-1; i++) {
    setTimeout(() => {
        enemies.push(new Enemy(movementType,startX,startY));
    }, 700* (i+1));
  }
}

let heroShip = new SpaceShip();
const stars = [];
const bullets = [];
const enemies = [];
const explosions = [];
enemyWave1(1);

for (let i = 0; i < 70; i++) {
  stars.push(new Star());
}

// draw stars
stars.forEach((s) => {
  s.draw();
});




function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // draw stars
  stars.forEach((s) => {
    s.draw();
  });

  // draw heroship
  heroShip.draw();

  // animate bullets from heroship
  bullets.forEach((b, idx) => {
    b.update(idx);
    b.draw();
  });

  // enemy animation
  enemies.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });

  // check for collision
  checkCollision();

  // explosion animation
  explosions.forEach((exp, idx) => {
    exp.update(idx);
    exp.draw();
  });

  if(game.gameSpeed==1)
  requestAnimationFrame(animate);
  else return
}



/////////// Event Listeners ///////////////

window.addEventListener("keydown", (e) => {
  // add bullets
  if (e.key === " ") {
    let x = heroShip.x + heroShip.width/2 - 10; // bulletwidth/2
    bullets.push(new Bullet(x, heroShip.y));
  }
});

window.addEventListener("mousemove", (e) => {
  if (game.gameSpeed===0) return; 
  heroShip.x = e.clientX;
});


function checkCollision() {
    bullets.forEach((b,b_idx)=>{
            enemies.forEach((e, e_idx) => {
                if (
                    (b.y<(e.y+e.height) && (b.y+b.height)<(e.y+e.height)) &&
                (b.x>e.x && (b.x+b.width)<(e.x+e.width))
            ) {
                explosions.push(new Explosion(e.x+e.width/2,e.y+e.height/2))
                enemies.splice(e_idx, 1);
                bullets.splice(b_idx,1)
            }
        })
    })
}

resumeGameBtn.addEventListener('click',()=>{
  game.resumeGame()
})

startGameBtn.addEventListener('click',()=>{
  game.startNewGame()
})

window.addEventListener('keydown',(e)=>{
  if(e.key ==='Escape'){
    game.pauseGame()
  }
})

