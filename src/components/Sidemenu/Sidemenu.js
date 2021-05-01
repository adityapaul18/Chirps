import React from 'react'
import { Avatar, Button } from '@material-ui/core'
import { auth } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import "./Sidemenu.css"
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function Sidemenu() {    
    const history = useHistory();
    const [user] = useAuthState(auth);
    const signout = () => {
        auth.signOut();
    }
    return (
        <div className="sidemenu_main">
           <div className="sidemenu_top">
                    <Avatar className="sidemenu_avatar" src={user.photoURL} />                    
                <div>
                    <span className="user__image" >{user.displayName}</span>
                </div>
                <div className="sidemenu__list">
                <Button onClick={() => {history.push("./")}} variant="contained">Home</Button>
                <Button onClick={() => {history.push("./profile")}} variant="contained">Profile</Button>
                <Button variant="contained"><a href="https://github.com/adityapaul18/Chirps">Github</a></Button>
                <Button variant="contained"><a href="https://adityapaul.herokuapp.com/">Contact</a></Button>
            </div>
            </div>
            
            <div className="sidemenu_bottom" >
            <Button onClick={signout}>logout</Button>
            Made By Aditya Paul 
            </div>
        </div>
    )
}

export default Sidemenu
