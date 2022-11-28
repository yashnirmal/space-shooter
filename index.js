const canvas = document.querySelector('#space-bg')
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height

// heroX ship data

class SpaceShip{
    constructor(){
        const img = new Image()
        img.src = "./hero.png"
        this.image = img
        this.heroSpriteWidth = 401
        this.heroSpriteHeight = 317
        this.width = 120
        this.height = 120
        this.x = 0
        this.y = CANVAS_HEIGHT-this.width
    }

    draw(){
        ctx.drawImage(this.image,0,0,this.heroSpriteWidth,this.heroSpriteHeight,this.x,this.y,this.width,this.height)
    }
}

const heroShip = new SpaceShip()

// heroship bullets
class Bullet{
    constructor(x,y){
        this.width = 20
        this.height = 20
        this.speed = 1
        this.direction = 'up'
        this.color = 'fff'
        this.speed = 5
        this.x=x
        this.y=y
    }

    update(){
        this.y-=1*this.speed
    }

    draw(){
        ctx.fillStyle='#'+this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}

const bullets = []

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    // ctx.fillStyle =
    // ctx.fillRect(0,0,100,100)
    heroShip.draw()
    bullets.forEach((b)=>{
        b.update()
        b.draw()
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