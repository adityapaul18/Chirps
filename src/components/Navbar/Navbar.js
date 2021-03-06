import React from 'react'
import './Navbar.css'
import { Avatar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add';
import { auth } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {Link} from 'react-router-dom'
function Navbar() { 
    const signout = () => {
        auth.signOut();
    }

    const [user] = useAuthState(auth);
    return (
        <div className="header">
            <div className="header-left" >
            <IconButton>
                <Link to='/chirp'> <MenuIcon className="icons"/></Link>
            </IconButton>
            </div>
            <div className="appname">
                <Link to='/'>Chirps</Link>
            </div>
            <div className="header-right" >
            <IconButton>
                <Avatar className="avatar" onClick={signout} src={user.photoURL} />
            </IconButton>
            </div>
        </div>
    )
}

export default Navbar
