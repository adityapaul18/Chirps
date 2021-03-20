import React, { useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add';
import { auth } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {Link} from 'react-router-dom'

function Sidemenu() {    
    const [user] = useAuthState(auth);
    return (
        <div>
           <div >
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
               made  by aditya paul 
            </div>
        </div>
    )
}

export default Sidemenu
