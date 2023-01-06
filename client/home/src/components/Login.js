import React,{useState,useEffect} from 'react';
import './Login.css';
import LoginSignupError from './LoginSignupError';
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [errorMsg,setErrorMsg] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  function tryLogin(){
    setErrorMsg("getting your details...")

    const reqOptions = {
      method:"POST",
      headers:{"Content-Type":"application/json",
      "Accept":"application/json"},
      body:JSON.stringify({username,password})
    }

    fetch("http://localhost:5050/login",reqOptions)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setErrorMsg(data.msg)
      if(data.status==='ok'){
        localStorage.setItem('usertoken',data.user)
        navigate("/")
        iframeSetTokenForGame()
      }
    })
  }

  function iframeSetTokenForGame(){
    const iframe = document.querySelector('iframe')
    const wind = iframe.contentWindow

    const spaceShooterData = {
      "usertoken":localStorage.getItem('usertoken')
    }

    wind.postMessage(spaceShooterData,"*")
  }

  useEffect(()=>{
    if(localStorage.getItem('usertoken')){
      navigate("/")
      iframeSetTokenForGame()       
    }
  },[])

  return (
    <div className='login-cont'>
      <div className='login'>
        <p className='login-signup-header'>Lets get back to the action</p>
        <p className='login-signup-header'>Login</p>
        <input type="text" placeholder='Enter username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button style={{width:"100%"}} onClick={tryLogin}>Login</button>
        <LoginSignupError errorMsg={errorMsg}/>
      </div>
    </div>
  )
}
