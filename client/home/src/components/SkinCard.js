import React from 'react';
import "./SkinCard.css";

export default function SkinCard(props) {
  return (
    <div className="skin-card">
    	<img src={props.image} alt={"img"+props.idx} />
    	<button>Unlock</button>
    </div>
  );
}
