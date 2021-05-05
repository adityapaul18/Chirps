import React from 'react'
import "./Login.css"
import logo from "../../images/mlogo.png"
import logo1 from "../../images/wlogo.jpeg"
import {auth, provider} from '../../Firebase.js';
import { Button } from '@material-ui/core';
import logog from "../../images/Google.svg"
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from 'react-spinkit'

function Login() {
    const signin = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((error) => alert("error signing up"))
    }
    const [user,loading] = useAuthState(auth);

    if(loading){
        return(
            <>
            <div className="loginload_container" >
            <div className="loginbox" >
                <div>
                <img className="logo" id="logo12" src={logo} alt="" />
                <img className="logo" id="logo11" src={logo1} alt="" />
                </div>
            <div className="login_enter">
            <Spinner name="wandering-cubes" color="#0166C0"/>
            </div>
            </div>  
        </div>
            </>
        )
    }
    return (
        <div className="login_container" >
            <div className="loginbox" >
                <div>
                <img className="logo" id="logo12" src={logo} alt="" />
                <img className="logo" id="logo11" src={logo1} alt="" />
                </div>
            <div className="login_enter">
                <p>Hop In Here</p>
                <Button variant="contained" className="loginbutton" onClick={signin} ><img className="glogo" src={logog} alt=""/>Login with Google</Button>
            </div>
            </div>  
        </div>
    )
}

export default Login
