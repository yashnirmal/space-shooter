const chooseLvlBtn = document.querySelector('#choose-level-btn');
const seeHighscoreBtn = document.querySelector("#see-highscore-btn");
const subMenus = document.querySelectorAll('.menu-container>div');
const subMenuBackBtn = document.querySelectorAll('#sub-menu-back-btn');
const highScoreBasedOnLevel = document.querySelectorAll(".highscore-score-div");
const seeSkinsBtn = document.querySelector("#see-skins-btn")
const skinCont = document.querySelector('.skin-cont')
const menuLoginBtn = document.querySelector("#menu-login-btn")
const loginBtn = document.querySelector('.login-btn')
const logoutBtn = document.querySelector('.logout-btn')
import axios from 'axios'
import jwt_decode from 'jwt-decode'


const BASE_URL = process.env.API
console.log(process.env.API)
// const BASE_URL = 'http://localhost:5050'


function callForScore(id){
    axios.get(`${BASE_URL}/score/${id}`)
    .then(data=>localStorage.setItem('game-score',JSON.stringify(data.data.data)))
}

function isLoggedIn(){
    return localStorage.getItem('usertoken')?true:false
}


window.addEventListener('load',()=>{
    //update the localstorage 
    if(!isLoggedIn()){
        return
    }
    const logRelatedElements = document.querySelectorAll('[data-loggedin]')
    logRelatedElements.forEach(el=>{
        if(el.dataset.loggedin==="true"){
            el.dataset.loggedin="false"
        }
        else{
            el.dataset.loggedin="true"
        }
    })
    const decoded = jwt_decode(localStorage.getItem('usertoken'))
    callForScore(decoded.id)
    document.querySelector('.hello-message>span>span').innerText=decoded.username
})


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

    // check if the score is greater then the previous score
    if(!isLoggedIn()) return

    const decoded = jwt_decode(localStorage.getItem('usertoken'))
    axios.post(`${BASE_URL}/score/${decoded.id}`,scoreObject)
    .then(data=>console.log(data.data.data))
    .catch(err=>console.log(err))

})


seeSkinsBtn.addEventListener('click', ()=>{
    subMenus.forEach(sb=>{
        sb.dataset.status='inactive'
    })
    subMenus[3].dataset.status = "active";
    getPlayerSkins()
})

menuLoginBtn.addEventListener('click',()=>{
    subMenus.forEach(sb=>{
        sb.dataset.status='inactive'
    })
    subMenus[4].dataset.status = "active";
})

subMenuBackBtn.forEach(backBtn=>{
    backBtn.addEventListener("click", () => {
      subMenus.forEach((sb) => {
        sb.dataset.status='inactive'
      });
      subMenus[0].dataset.status='active'
    });
})

function appendShip(shipUrl){
    const div = document.createElement('div')
    div.classList.add('skin-card')
    const img = document.createElement('img')
    img.src = shipUrl
    const button = document.createElement('button')
    button.innerText='Chosen'
    button.dataset.chosen='yes'
    div.appendChild(img)
    div.appendChild(button)
    skinCont.appendChild(div)
}


function getPlayerSkins(){
    // clearing elements from before
    skinCont.innerText=''
    // add the deafult ship - only once
    appendShip('./assets/pics/hero.png')

    if(!isLoggedIn()){
        return
    }
    const decoded = jwt_decode(localStorage.getItem('usertoken'))
    //load game skins
    axios.get(`${BASE_URL}/playerships/${decoded.id}`)
    .then((data)=>{
        // getting ships id
        const skins = data.data.data
        // getting ships data
        let skinsData=[];
        for(let i=0;i<skins.length;i++){
            axios.get(`${BASE_URL}/ship/${skins[i]}`)
            .then((data)=>{
                let singleShip = data.data.data
                // append the ship 
                appendShip(singleShip.file)
            })
        }
    })
    .catch((err)=>{
        console.log('error',err)
        alert('Something went wrong, try again after sometime')
    })    
}


loginBtn.addEventListener('click',()=>{
    console.log("loggin in")
    const errMsg = document.querySelector('.login-err-msg')
    errMsg.innerText="getting details..."

    axios.post(`${BASE_URL}/login`,{
        username:document.querySelector('.login-username').value,
        password:document.querySelector('.login-pass').value
    })
    .then(data=>{
        console.log(data)
        let result = data.data
        if(result.status==='ok'){
            errMsg.innerText=result.msg
            localStorage.setItem('usertoken',result.user)
            location.reload()
        }
        else{
            errMsg.innerText = result.msg
        }
    })
    .catch(err=>{
        let result = err.response?.data
        if(result?.status!=='ok'){
            errMsg.innerText = result?.msg
        }
    })
})

logoutBtn.addEventListener('click',()=>{
    console.log('logging out...')
    localStorage.clear()
    const logRelatedElements = document.querySelectorAll('[data-loggedin]')
    logRelatedElements.forEach(el=>{
        if(el.dataset.loggedin==="true"){
            el.dataset.loggedin="false"
        }
        else{
            el.dataset.loggedin="true"
        }
    })
    location.reload()
})