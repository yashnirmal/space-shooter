import React from 'react'

export default function LoginSignupError(props) {
  return (
    <div style={{color:"red"}}>{props.errorMsg}</div>
  )
}
