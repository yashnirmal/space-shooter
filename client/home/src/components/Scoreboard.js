import {useEffect,useState} from 'react';
import "./Scoreboard.css";

export default function Scoreboard() {

  const [scoreData,setScoreData] = useState([])

  function getScoreboardData(id){
    fetch(`${process.env.REACT_APP_BASE_URL}/scoreboard/${id}`)
    .then(res=>res.json())
    .then(data=>setScoreData(data.data.reverse()))
    .catch((err)=>{
      alert("Server error, cannot retreive scoreboard data")
    })
  }

  function scoreboardLevelChanged(e){
    document.querySelector("[data-status='checked']").dataset.status="un-checked"
    e.target.dataset.status="checked"
    const id = parseInt(e.target.dataset.index)
    getScoreboardData(id)
  }

  useEffect(()=>{
    getScoreboardData(document.querySelector("[data-status='checked']").dataset.index)
  },[])

  return (
    <div className="scoreboard" id='scoreboard'>
      <div className="scoreboard-table">
        <div className="level-choose">
          <button data-index="0" onClick={scoreboardLevelChanged} data-status="checked">Easy</button>
          <button data-index="1" onClick={scoreboardLevelChanged} data-status="un-checked">Medium</button>
          <button data-index="2" onClick={scoreboardLevelChanged} data-status="un-checked">Hard</button>
          <button data-index="3" onClick={scoreboardLevelChanged} data-status="un-checked">Impossible</button>
        </div>
        <div className="players-list">
          {
            scoreData.map((el)=>(
              <div className="scoreboard-item">
                <span>{el.username}</span>
                <span>{el.score}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
