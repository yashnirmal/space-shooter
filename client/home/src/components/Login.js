import React from 'react';
import './Login.css';

export default function Login() {
  return (
    <div className='login-cont'>
      <div className='login'>
        <input type="text" placeholder='Enter username'/>
        <input type="text" placeholder='Password' />
        <input type="text" placeholder='Confirm password'/>
        <button style={{width:"100%"}}>Login</button>
      </div>
    </div>
  )
}
