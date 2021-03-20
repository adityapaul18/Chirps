import React, { useState } from 'react'
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
    const [ sidebar, setSidebar ] = useState(0);
    const showSidebar = () => setSidebar(!sidebar)
    return (
        <div className="header">
        <nav className = {sidebar ? 'nav-menu active' : 'nav-menu'} >
                <div className="navbar-toggle">
                    <Avatar onClick={showSidebar} src={user.photoURL} />                    
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
            <div className="lower">
               made  by aditya paul 
            </div>
        </nav>
            <div className="header-left" >
            <IconButton >
                <Avatar onClick={showSidebar} className="avatar" src={user.photoURL} />
            </IconButton>
            </div>
            <div className="appname">
                <Link to='/'>Chirps</Link>
            </div>
            <div className="header-right" >
            <IconButton>
                <Link to='/chirp'> <AddIcon className="icons"/></Link>
            </IconButton>
            </div>
        </div>
    )
}

export default Navbar
