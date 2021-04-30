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
                    <Avatar className="sidemenu_avatar" src={user.photoURL} />                    
                <div>
                    <span className="user__image" >{user.displayName}</span>
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
            Made By Aditya Paul 
        </div>
    )
}

export default Sidemenu
