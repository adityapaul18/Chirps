import React from 'react'
import "./Login.css"
import logo from "../../images/chirplog.png"
import {auth, provider} from '../../Firebase.js';
import { Button } from '@material-ui/core';


function Login() {
    const signin = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((error) => alert("error signing up"))
    }
    return (
        <div className="login_container" >
            <div className="loginbox" >
                <div><img className="logo" src={logo} alt="" /></div>
                <div>
                    <h1 className="appheader" >Chirps-App</h1>
                </div>
            </div>  
                <Button variant="contained" className="loginbutton" onClick={signin} >Login with Google</Button>
        </div>
    )
}

export default Login
