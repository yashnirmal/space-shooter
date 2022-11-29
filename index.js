const canvas = document.querySelector('#space-bg')
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height



class SpaceShip{
    constructor(){
        const img = new Image()
        img.src = "./hero.png"
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

    update() {
        this.y -= 1 * this.speed;
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
        img.src = "./enemy.png"
        this.image = img
        this.spriteWidth = 431
        this.spriteHeight = 431
        this.width = this.height = 120
        if(x===null) this.x = Math.random() * CANVAS_WIDTH;
        else this.x = x;
        if (y === null) this.y = -this.height;
        else this.y = y;
        this.horizontalSpeed = 4
        this.downSpeed = 0.5
        this.counter = 0
        this.angle = 2;
        this.movementType = moveType
    }

    update(){
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
            this.x += 4 * Math.sin((this.angle * Math.PI) / 90);
            this.angle += 1;
            this.y += 1 * this.downSpeed;
        }

    }

    draw(){
        ctx.drawImage(this.image,0,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
    }
}

const heroShip = new SpaceShip()
const bullets = []

stars = []
for(let i=0;i<70;i++){
    stars.push(new Star())
}

enemies = []
enemyWave1(5,"sine-wave")
enemyWave2(5,"zig-zag")

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
  startX = e.x
  startY = e.y
  enemies.push(e)
  for (let i = 0; i < n-1; i++) {
    setTimeout(() => {
        console.log(enemies.length)
        enemies.push(new Enemy(movementType,startX,startY));
    }, 700* (i+1));
  }
}




function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    // draw stars
    stars.forEach((s)=>{
        s.draw()
    })

    // draw heroship
    heroShip.draw()

    // animate bullets from heroship
    bullets.forEach((b)=>{
        b.update()
        b.draw()
    })

    // enemy animation
    enemies.forEach((enemy)=>{
        enemy.update()
        enemy.draw()
    })

    requestAnimationFrame(animate)
}

animate()

window.addEventListener("keydown", (e) => {
  // add bullets
  if (e.key === " ") {
    let x = heroShip.x + heroShip.width/2 - 10; // bulletwidth/2
    bullets.push(new Bullet(x, heroShip.y));
  }
});

window.addEventListener("mousemove", (e) => {
  heroShip.x = e.clientX;
});