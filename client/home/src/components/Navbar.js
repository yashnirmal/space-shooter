import React, { Profiler, useEffect } from 'react';
import "./Navbar.css";
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import ProfileCard from './ProfileCard';
import jwt_decode from 'jwt-decode';

export default function Navbar() {

  const navigate = useNavigate();
  const [profileOpen,setProfileOpen] = useState(false);
  const [username,setUsername] = useState("")

  useEffect(()=>{
    const token = localStorage.getItem('usertoken')
    if(token){
      const decoded = jwt_decode(token)
      setUsername(decoded.username)
    }
  },[])

  return (
    <div className="navbar">
      <Link className="logo" to="/">
        SpaceWars
      </Link>
      <div>
        <Link to="/">Home</Link>
        <Link to="/skins">Skins</Link>
        <Link to="/#scoreboard">Scoreboard</Link>
      </div>
      <div>
        {
          (!localStorage.getItem('usertoken'))?<>
          <Link to="/login">Login</Link>
          <button onClick={()=>navigate('/signup')}>Signup</button>
          </>:<>
          <span className='nav_profile' onClick={()=>setProfileOpen(true)}>{username}</span>
          {profileOpen&&<ProfileCard setProfileOpen={setProfileOpen} />}
          </>
        }
      </div>
    </div>
  );
}
