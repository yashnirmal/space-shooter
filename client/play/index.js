const gameMenu = document.querySelector('.menu')
const startGameBtn = document.querySelector('#start-game-btn')
const resumeGameBtn = document.querySelector('#resume-game-btn')
const musicSfxToggle = document.querySelectorAll("#menu-music-sfx>button");
const menuLvlBtns = document.querySelectorAll('#menu-level-btn');
const mainMenuChooseLvlBtn = document.querySelector('#choose-level-btn');
const gameOverAndScoreDiv = document.querySelector('.game-over-score-div');
const canvas = document.querySelector('#space-bg');
const ctx = canvas.getContext('2d');
let initialDifficulty = null;

const CANVAS_WIDTH = canvas.width
const CANVAS_HEIGHT = canvas.height


if(localStorage.getItem('game-level')!=null){

mainMenuChooseLvlBtn.innerText =
 ("Choose Level : " +
    localStorage.getItem("game-level")[0].toUpperCase() +
    localStorage.getItem("game-level").substring(1) );
}
else{
  localStorage.setItem('game-level','easy')
  mainMenuChooseLvlBtn.innerText="Choose Level : Easy";
}

class Game{
  constructor(){
    this.gameOver = true;
    this.gameSpeed = 0;
    this.music = new Audio("./assets/sounds/music/music1.mp3");
    this.music.loop = true;
    this.isSfxOn = true;
    this.difficulty = localStorage.getItem("game-level") || "easy";
    this.firingSpeed = 1; // heroship.firingSpeed = 5+2*game.firingSpeed;
    this.enemyNumber = 5;
    this.enemyDownSpeed = 0; //enemy.downSpeed = 1+game.downSpeed;
    this.enemyWaveInterval = 1;
    this.score = 0
  }

  pauseGame(){
    this.saveScore();
    gameOverAndScoreDiv.dataset.status = 'show'
    gameOverAndScoreDiv.children[0].innerText = "Game Paused";
    gameOverAndScoreDiv.children[1].innerText = "Score : " + this.score;
    this.gameSpeed = 0
    gameMenu.style.display = 'flex'
  }

  resumeGame(){
    gameOverAndScoreDiv.dataset.status = 'hide'
    this.saveScore()
    game.gameSpeed = 1;
    game.gameOver = false;
    gameMenu.style.display = "none";
    animate();
  }

  doGameOver(){
    gameOverAndScoreDiv.dataset.status = 'show'
    gameOverAndScoreDiv.children[0].innerText = "Game Over!!";
    gameOverAndScoreDiv.children[1].innerText = "Score : " + this.score;
    this.saveScore()
    this.score=0
    this.gameOver = true
    this.gameSpeed = 0
    gameMenu.style.display = 'flex'
    bullets.splice(0,bullets.length)
    enemies.splice(0,enemies.length)
    explosions.splice(0,explosions.length)
    asteroids.splice(0,asteroids.length)
    heroShip = null
  }

  startNewGame(){
    this.doGameOver()
    enemyWaveController()
    heroShip = new SpaceShip()
    this.resumeGame();
  }

  saveScore(){
    let gameScore;
    if(localStorage.getItem('game-score')==null){
      gameScore = {
        'easy':0,
        'medium':0,
        'hard':0,
        'impossible':0,
      }
    }
    else{
      gameScore=JSON.parse(localStorage.getItem('game-score'))
    }
    if (gameScore[initialDifficulty]<this.score){
      gameScore[initialDifficulty]=this.score;
    } 
    localStorage.setItem('game-score',JSON.stringify(gameScore))
  }
}

const game = new Game()
let heroShip = new SpaceShip();
const stars = [];
const bullets = [];
const enemies = [];
const explosions = [];
const asteroids = [];
setResumeGameBtnVisibility();


function enemyWaveController(){

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

  enemyWave1()
  setInterval(()=>{
    if(game.gameSpeed!==0){
      let numberOfEnemies = parseInt(Math.random()*2)
      let whichWave =Math.random()
      let whichMovement = Math.random()
      if(whichWave>0.5){
        if(whichMovement>0.5) enemyWave1(numberOfEnemies, "sine-wave");
        else enemyWave1(numberOfEnemies,"zig-zag");
      }
      else{
        if (whichMovement > 0.5) enemyWave2(numberOfEnemies, "sine-wave");
        else enemyWave2(numberOfEnemies,"zig-zag");
      }
    }
  },10000*game.enemyWaveInterval)

  
  setInterval(() => {
    if(game.gameSpeed!==0){
      asteroids.push(new Asteroid());
    }
  }, 9000);
}


for (let i = 0; i < 100; i++) {
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
  enemies.forEach((enemy,idx) => {
    enemy.update(idx);
    enemy.draw();
  });

  // check for collision
  checkCollision();

  // explosion animation
  explosions.forEach((exp, idx) => {
    exp.update(idx);
    exp.draw();
  });

  //animate asteroids
  asteroids.forEach(ast=>{
    ast.update()
    ast.draw()
  })

  //animate game score
  ctx.fillStyle = '#fff'
  ctx.font = "bold 30px arial"
  ctx.fillText("Score : "+game.score,15,30,CANVAS_WIDTH/10)

  if(game.gameSpeed==1)
  requestAnimationFrame(animate);
  else return
}



/////////// Event Listeners ///////////////

window.addEventListener("keydown", (e) => {
  // add bullets
  if (e.key === " ") {
    heroShip.fireBullets()
  }
});

window.addEventListener("keyup", (e) => {
  // add bullets
  if (e.key === " ") {
    heroShip.fireBullets('single press')
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
                game.score+=1
                enemies.splice(e_idx, 1);
                bullets.splice(b_idx,1)
            }
        })
    })

    // checking collision between asterois and heroship
    asteroids.forEach(as=>{
      if((as.y+as.height>heroShip.y) && ((as.x+as.width>heroShip.x)&&(as.x+as.width<heroShip.x+heroShip.width) || (as.x>heroShip.x)&&(as.x<heroShip.x+heroShip.width))){
        explosions.push(new Explosion(heroShip.x+heroShip.width/2,heroShip.y+heroShip.height/2,true))
        game.pauseGame()
        heroShip=null
      }
    })
}

resumeGameBtn.addEventListener('click',()=>{
  game.resumeGame()
})

startGameBtn.addEventListener('click',()=>{
  game.startNewGame()
  // don't change intial difficulty until start new game is called
  initialDifficulty = game.difficulty;
  setResumeGameBtnVisibility();
})

window.addEventListener('keydown',(e)=>{
  if(e.key ==='Escape'){
    game.pauseGame()
  }
})

musicSfxToggle[0].addEventListener('click',()=>{
  console.log('here')
  if(musicSfxToggle[0].dataset.active==="true"){
    game.music.pause()
    musicSfxToggle[0].dataset.active="false";
  }else{
    game.music.play()
    musicSfxToggle[0].dataset.active="true";
  }
})

musicSfxToggle[1].addEventListener('click',()=>{
  console.log("here");
  if (musicSfxToggle[1].dataset.active === "true") {
    game.isSfxOn = false
    musicSfxToggle[1].dataset.active = "false";
  } else {
    game.isSfxOn=true
    musicSfxToggle[1].dataset.active = "true";
  }
})

menuLvlBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    let lvl = btn.dataset.value;
    game.difficulty = lvl
    localStorage.setItem('game-level',lvl)
    mainMenuChooseLvlBtn.innerText = "Choose Level : "+
      lvl["0"].toUpperCase() + lvl.substring(1);
    subMenuBackBtn[0].click()

    changeGameDifficultyParameters()
    setResumeGameBtnVisibility()
  })
})

function changeGameDifficultyParameters(){
  // heroship.firingSpeed = 5+2*game.firingSpeed;
  //enemy.downSpeed = 1+game.downSpeed;
  // enemyNumber = Math.random()*2+game.enemyNumber
  // wave is sent every 10 seconds
  // enemywave interval = 10000*game.enemyWaveInterval
  if (game.difficulty === "easy") {
    game.firingSpeed = 2;
    game.enemyNumber = 7;
    game.enemyDownSpeed = 0.5;
    game.enemyWaveInterval = 0.7;
  } else if (game.difficulty === "medium") {
    game.firingSpeed = 5;
    game.enemyNumber = 9;
    game.enemyDownSpeed = 1.5;
    game.enemyWaveInterval = 0.3;
  } else if (game.difficulty === "hard") {
    game.firingSpeed = 7;
    game.enemyNumber = 11;
    game.enemyDownSpeed = 3;
    game.enemyWaveInterval = 0.2;
  } else if (game.difficulty === "impossible") {
    game.firingSpeed = 5;
    game.enemyNumber = 15;
    game.enemyDownSpeed = 4;
    game.enemyWaveInterval = 0.05;
  }
}

function setResumeGameBtnVisibility() {
  if (initialDifficulty == null || initialDifficulty !== game.difficulty) {
    resumeGameBtn.dataset.status = "hide";
    game.doGameOver()
  } else {
    resumeGameBtn.dataset.status = "show";
  }
}