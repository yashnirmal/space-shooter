class Asteroid{
    constructor(){
        const img = new Image()
        img.src = "../assets/pics/asteroid.png"
        this.image = img
        this.spriteWidth = 290
        this.spriteHeight = 250
        this.width = 120
        this.height = 120
        this.x = Math.random()*CANVAS_WIDTH
        this.y = -this.height
        this.speedY = 3
        this.speedX = 4
        if(this.x>CANVAS_WIDTH/2){
            this.speedX*=-1
        }
    }

    update(){
        this.y+=this.speedY
        this.x+=this.speedX
    }

    draw(){
        ctx.drawImage(this.image,0,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
    }
}