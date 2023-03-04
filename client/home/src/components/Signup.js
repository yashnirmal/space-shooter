import React,{useState,useEffect} from 'react';
import './Login.css';
import LoginSignupError from "./LoginSignupError";
import { useNavigate } from "react-router-dom";


export default function Signup() {

  const [errorMsg,setErrorMsg] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const navigate = useNavigate()

  function checkPasswordValidity(){
    // check password 
    if(password.length<8 & password.length>12){
      setErrorMsg("Password length should atleast be 8 and atmost 12")
      return false
    }

    if(password!==confirmpass){
      setErrorMsg("Password and confirmed password should be same")
      return false
    }

    return true
  }


  function trySignup(){
    if(!checkPasswordValidity()){
      return
    }

    setErrorMsg("trying make a new account for you...");

    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/signup`, reqOptions)
      .then((res) => res.json())
      .then((data) => {
        setErrorMsg(data.msg);
        if(data.status='ok'){
          localStorage.setItem('usertoken',data.user);
          navigate("/")
        }
      });
  }

  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="login-cont">
      <div className="login">
        <p className='login-signup-header'>Lets get you a new account</p>
        <p className='login-signup-header'>SignUp</p>
        <input type="text" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <input type="password" placeholder='Confirm password' value={confirmpass}  onChange={(e)=>setConfirmpass(e.target.value)}/>
        <button style={{ width: "100%" }} onClick={trySignup}>Signup</button>
        <LoginSignupError errorMsg={errorMsg} />
      </div>
    </div>
  );
}