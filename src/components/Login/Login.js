import React from 'react'
import "./Login.css"
import logo from "../../images/chirplog.png"

function Login() {
    return (
        <div className="login_container" >
            <div className="loginbox" >
                <div><img className="logo" src={logo} alt="" /></div>
                <div>
                    <h1 className="appheader" >Chirps-App</h1>
                </div>
            </div>  
                <button className="loginbutton" >Login with Google</button>
        </div>
    )
}

export default Login
