import React from 'react'
import './Navbar.css'
import { Avatar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add';
import { auth } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Navbar() { 
    const signout = () => {
        auth.signOut();
    }

    const [user] = useAuthState(auth);
    return (
        <div className="header">
            <div className="header-left" >
            <IconButton>
                <MenuIcon className="icons"/>
            </IconButton>
            </div>
            <div className="appname">
                Chirps
            </div>
            <div className="header-right" >
            <IconButton>
                {/* <AddIcon className="icons" /> */}
            </IconButton>
            <IconButton>
                <Avatar onClick={signout} src={user.photoURL} />
            </IconButton>
            </div>
        </div>
    )
}

export default Navbar
