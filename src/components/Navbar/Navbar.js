import React, { useState } from 'react'
import './Navbar.css'
import { Avatar, Button, IconButton } from '@material-ui/core'
import image from "../../images/head.png"
import AddIcon from '@material-ui/icons/Add';
import { auth } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {Link, useHistory} from 'react-router-dom'
function Navbar() { 
    const signout = () => {
        auth.signOut();
    }
    const history= useHistory();
    const [user] = useAuthState(auth);
    const [ sidebar, setSidebar ] = useState(0);
    const showSidebar = () => setSidebar(!sidebar)
    return (
        <div className="mainhead">
            <img className="topimghead" src={image} alt="nohead"/>
        <div className="header">
        <nav className = {sidebar ? 'nav-menu active' : 'nav-menu'} >
                <div className="navbar-toggle">
                    <Avatar onClick={showSidebar} src={user.photoURL} />                    
                <div>
                    {user.displayName}
                </div>
                    <Button onClick={() => {history.push("./profile")}}>profile</Button>
                    <Button onClick={signout}>logout</Button>
                </div>
                    <Button onClick={() => {history.push("./")}}>Home</Button>
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
            <div className="header">
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
        </div>
        </div>

    )
}

export default Navbar
