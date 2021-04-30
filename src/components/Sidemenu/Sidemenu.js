import React, { useState } from 'react'
import { Avatar, Button, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add';
import { auth } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {Link} from 'react-router-dom'
import "./Sidemenu.css"

function Sidemenu() {    
    const [user] = useAuthState(auth);
    const signout = () => {
        auth.signOut();
    }
    return (
        <div className="sidemenu_main">
           <div className="sidemenu_top">
                    <Avatar src={user.photoURL} />                    
                <div>
                    {user.displayName}
                    <div>your profile</div>
                </div>
                </div>
                <div className="list">
                    <ul>
                        <li>github code</li>
                        <li>github code</li>
                        <li>github code</li>
                        <li>github code</li>
                        <li>github code</li>
                    </ul>
                </div>
            <div >
            <Button onClick={signout}>logout</Button>
            </div>
               made  by aditya paul 
        </div>
    )
}

export default Sidemenu
