import React from 'react';
import "./ProfileCard.css"

export default function ProfileCard(props) {
  return (
    <div
      className="profile-card-cont"
      onClick={() => props.setProfileOpen(false)}
    >
      <div className="profile-card">
        <p>Hey username, Here are your stats 👇</p>
        <div className="stat-indi">
          <span>Easy</span>
          <span>34</span>
        </div>
        <div className="stat-indi">
          <span>Medium</span>
          <span>34</span>
        </div>
        <div className="stat-indi">
          <span>Hard</span>
          <span>34</span>
        </div>
        <div className="stat-indi">
          <span>Impossible</span>
          <span>34</span>
        </div>
        <p className='logout-btn' onClick={()=>localStorage.clear()}>Logout</p>
      </div>
    </div>
  );
}
