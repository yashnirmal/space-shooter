const chooseLvlBtn = document.querySelector('#choose-level-btn');
const seeHighscoreBtn = document.querySelector("#see-highscore-btn");
const subMenus = document.querySelectorAll('.menu-container>div');
const subMenuBackBtn = document.querySelectorAll('#sub-menu-back-btn');
const highScoreBasedOnLevel = document.querySelectorAll(".highscore-score-div");

chooseLvlBtn.addEventListener('click',()=>{
    subMenus.forEach(sb=>{
        sb.dataset.status='inactive'
    })
    subMenus[1].dataset.status='active'
})

seeHighscoreBtn.addEventListener('click',()=>{
    subMenus.forEach(sb=>{
        sb.dataset.status='inactive'
    })
    subMenus[2].dataset.status = "active";

    let scoreObject = JSON.parse(localStorage.getItem("game-score"));
    highScoreBasedOnLevel[0].children[1].innerText = scoreObject["easy"];
    highScoreBasedOnLevel[1].children[1].innerText = scoreObject["medium"];
    highScoreBasedOnLevel[2].children[1].innerText = scoreObject["hard"];
    highScoreBasedOnLevel[3].children[1].innerText = scoreObject["impossible"];
})

subMenuBackBtn.forEach(backBtn=>{
    backBtn.addEventListener("click", () => {
      subMenus.forEach((sb) => {
        sb.dataset.status='inactive'
      });
      subMenus[0].dataset.status='active'
    });
})

