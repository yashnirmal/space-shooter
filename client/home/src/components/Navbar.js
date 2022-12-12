import React from 'react';
import "./Navbar.css";
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

  const navigate = useNavigate();

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
        <Link to="/login">Login</Link>
        <button onClick={()=>navigate('/signup')}>Signup</button>
      </div>
    </div>
  );
}
