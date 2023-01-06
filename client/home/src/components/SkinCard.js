import React from 'react';
import "./SkinCard.css";

export default function SkinCard(props) {
  return (
    <div className="skin-card">
    	<img src={props.image} alt={"img"+props.idx} />
      <div  className="skin-price">
        <span>Rs. {props.price}</span>
      	<button>Unlock</button>
      </div>
    </div>
  );
}
