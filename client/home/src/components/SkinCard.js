import React from 'react';
import "./SkinCard.css";
import {useNavigate} from 'react-router-dom'
import jwt_decode from 'jwt-decode'


export default function SkinCard(props) {

  function unlockBtnClicked(e){
    if(!localStorage.getItem('usertoken')){
      e.preventDefault()
      alert("To buy skins you have to login first")
      return;
    }
  }

  const navigate = useNavigate()
  return (
    <div className="skin-card">
    	<img src={props.image} alt={"img"+props.idx} />
      <div  className="skin-price">
        <span>Rs. {props.price}</span>
      	<form action={`${process.env.REACT_APP_BASE_URL}/checkout`} method="POST">
        <input type="hidden" name="skinprice" id="skinprice" value={props.price}/>
        <input type="hidden" name="skinid" id="skinid" value={props.id} />
        <input type="hidden" name="playerid" id="playerid" value={jwt_decode(localStorage.getItem('usertoken')).username} />
          <button onClick={unlockBtnClicked}>
            Unlock
          </button>
      </form>
      </div>
    </div>
  );
}
