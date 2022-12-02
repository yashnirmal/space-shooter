const chooseLvlBtn = document.querySelector('#choose-level-btn');
const seeHighscoreBtn = document.querySelector("#see-highscore-btn");
const subMenus = document.querySelectorAll('.menu-container>div');
const subMenuBackBtn = document.querySelectorAll('#sub-menu-back-btn');

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
})

subMenuBackBtn.forEach(backBtn=>{
    backBtn.addEventListener("click", () => {
      subMenus.forEach((sb) => {
        sb.dataset.status='inactive'
      });
      subMenus[0].dataset.status='active'
    });
})

