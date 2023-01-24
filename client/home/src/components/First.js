import React from 'react';
import "./First.css";
import SpaceshipImg from "../assets/hero.png";
import { useNavigate } from 'react-router-dom';

export default function First() {
  const navigate = useNavigate();
  return (
    <div className="First">
      <div>
        <p>Play and Defeat aliens from outer space</p>
      </div>
      <div>
        <img src={SpaceshipImg} alt="" srcset="" />
        <button
          onClick={() => window.open("https://space-shooter-play.vercel.app/")}
        >
          Play
        </button>
      </div>
    </div>
  );
}
