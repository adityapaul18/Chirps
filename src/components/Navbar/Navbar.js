import React, { useState } from 'react'
import './Navbar.css'
import { Avatar} from '@material-ui/core'
import image from "../../images/head.png"
import AddIcon from '@material-ui/icons/Add';
import { auth } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {Link} from 'react-router-dom'
import Sidemenu from '../Sidemenu/Sidemenu';
import CloseIcon from '@material-ui/icons/Close';

function Navbar() { 
    const [user] = useAuthState(auth);
    const [ sidebar, setSidebar ] = useState(0);
    const showSidebar = () => setSidebar(!sidebar)
    return (
    <>
        <div className="mainhead">
            <Avatar onClick={showSidebar} className="avatar" src={user.photoURL} >{user.displayName.charAt(0).toLocaleUpperCase()}</Avatar>
            <img className="topimghead" src={image} alt="nohead"/>
            <Link to='/chirp'> <AddIcon className="icons"/></Link>       
        </div>
        <div className="header1">
        <nav className = {sidebar ? 'nav-menu active' : 'nav-menu'} >
                <div className="navbar-toggle" onClick={showSidebar}>
                    < CloseIcon onClick={showSidebar}/>                
                </div>
                    <Sidemenu sidebar={sidebar}  setSidebar={setSidebar}/>
        </nav>
        </div>

    </>    
    )
}

export default Navbar
