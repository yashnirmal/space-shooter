import React from 'react';
import './Login.css';

export default function Signup() {
  return (
    <div className="login-cont">
      <div className="login">
        <input type="text" placeholder="Enter username" />
        <input type="text" placeholder="Password" />
        <button style={{ width: "100%" }}>Signup</button>
      </div>
    </div>
  );
}
