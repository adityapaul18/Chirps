import React, { useState } from 'react'
import "./Login.css"
import logo from "../../images/mlogo.png"
import logo1 from "../../images/wlogo.jpeg"
import {auth, provider} from '../../Firebase.js';
import { Avatar, Button, TextField } from '@material-ui/core';
import logog from "../../images/Google.svg"
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from 'react-spinkit'
import FileBase from 'react-file-base64';

function Login() {
    const signin2 = () => {
        auth.signInWithEmailAndPassword(mail,password).then(() => {
            // console.log("under improvement ,  plz login with google :)")
        }).catch((err) => alert("password and mail do not match"))

        setpassword("")
    }
    const signin = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch((err) => alert("error signing up"))
    }
    const signup = async () => {
        if(!name || mail==="" || password==="" || !/\S/.test(name)|| !/\S/.test(mail)|| !/\S/.test(password)){
            alert("plz fill up all the fields")
            return;
        }
            
        await auth.createUserWithEmailAndPassword(mail,password).then((userAuth) => {
            userAuth.user
              .updateProfile({
                displayName: name,
            })
        }).catch((err) => {
                var errMessage = err.message;
                alert(errMessage)
            setname("")
            setmail("")
            setpassword("")
            }
            )

        console.log(name)
        console.log(mail)
        console.log(profilepic)
        console.log(password)
    }
    const [newuser, setnewuser] = useState(0)
    const [user,loading] = useAuthState(auth);
    const [mail, setmail] = useState("")
    const [name, setname] = useState("")
    const [profilepic, setprofilepic] = useState("")
    const [password, setpassword] = useState("")
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
                    {newuser ? 
                    <>
                        <p>Hop In Here</p>
                        <TextField variant="outlined" label="Email" value={mail} onChange={(e) => setmail(e.target.value)}/>
                        <TextField variant="outlined" label="Password" value={password} onChange={(e) => setpassword(e.target.value)} type="password"/>          
                        <Button variant="contained" className="loginbutton2" onClick={signin2} >Sign in</Button>
                        <Button variant="contained" className="loginbutton" onClick={signin} ><img className="glogo" src={logog} alt=""/>Login with Google</Button>
                        <span className="switch">new user ? <span onClick={() => {setnewuser(0)}}>Signup</span> </span>
                    </> 
                    : 
                    <>
                        <p>Lets get you registered</p>
                        <Avatar className="signup_image">{name.charAt(0).toLocaleUpperCase() || "P"}</Avatar>
                        <TextField variant="outlined" label="Name" value={name} onChange={(e) => setname(e.target.value)}/>
                        <TextField variant="outlined" label="Email" value={mail} onChange={(e) => setmail(e.target.value)} type="email"/>
                        <TextField variant="outlined" label="Password" value={password} onChange={(e) => setpassword(e.target.value)} type="password"/>  
                        <Button variant="contained" className="loginbutton2" onClick={signup} >Sign Up</Button>
                        <Button variant="contained" className="loginbutton" onClick={signin} ><img className="glogo" src={logog} alt=""/>Login with Google</Button>
                        <span className="switch">Have an account ? <span onClick={() => {setnewuser(1)}}>Signin</span> </span>
                    </>}
                    
                </div>
            </div>  
        </div>
    )
}

export default Login
