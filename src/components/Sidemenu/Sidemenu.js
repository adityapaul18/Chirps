import React from 'react'
import { Avatar, Button } from '@material-ui/core'
import { auth } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import "./Sidemenu.css"
import { useHistory } from 'react-router';

function Sidemenu({sidebar , setSidebar}) {    
    const history = useHistory();
    const [user] = useAuthState(auth);
    const signout = () => {
        auth.signOut();
    } 
    const showSidebar = () => {
        history.push("./")
        setSidebar(!sidebar)
    }
    const showSidebar2 = () => {
        history.push("./profile")
        setSidebar(!sidebar)
    }
    return (
        <div className="sidemenu_main">
           <div className="sidemenu_top">
                    <Avatar className="sidemenu_avatar" src={user.photoURL} >{user?.displayName.charAt(0)}</Avatar>                    
                <div>
                    <span className="user__image" >{user.displayName}</span>
                </div>
                <div className="sidemenu__list">
                <Button onClick={showSidebar} variant="contained">Home</Button>
                <Button onClick={showSidebar2} variant="contained">Profile</Button>
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
