import React,{useState,useEffect} from 'react';
import "./ProfileCard.css";
import jwt_decode from "jwt-decode"

export default function ProfileCard(props) {

  const [username,setUsername] = useState("username")
  const [score,setScore] = useState({});

  function getUserStats(id){
    
    fetch(`${process.env.REACT_APP_BASE_URL}/${id}`)
    .then(res=>res.json())
    .then(data=>{
      if(data.status==='ok'){
        setScore(data.data)
      }
    })
  }

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      const decoded = jwt_decode(token);
      setUsername(decoded.username);
      getUserStats(decoded.id)
    }
  }, []);

  return (
    <div
      className="profile-card-cont"
      onClick={() => props.setProfileOpen(false)}
    >
      <div className="profile-card">
        <p>Hey {username}, Here are your stats 👇</p>
        <div className="stat-indi">
          <span>Easy</span>
          <span>{score.easy}</span>
        </div>
        <div className="stat-indi">
          <span>Medium</span>
          <span>{score.medium}</span>
        </div>
        <div className="stat-indi">
          <span>Hard</span>
          <span>{score.hard}</span>
        </div>
        <div className="stat-indi">
          <span>Impossible</span>
          <span>{score.impossible}</span>
        </div>
        <p className='logout-btn' onClick={()=>localStorage.clear()}>Logout</p>
      </div>
    </div>
  );
}
