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
                <MenuIcon className="icons" onClick={signout} />
            </IconButton>
            </div>
            <div className="appname">
                <Link to='/'>Chirps</Link>
            </div>
            <div className="header-right" >
            <IconButton>
                <Link to='/chirp'> <AddIcon className="icons"/></Link>
            </IconButton>
            <IconButton>
            <Link to='/profile'>
                <Avatar className="avatar" src={user.photoURL} />
            </Link> 
            </IconButton>
            </div>
        </div>
    )
}

export default Navbar
