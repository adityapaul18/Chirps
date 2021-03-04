import React from 'react'
import './Navbar.css'
import { Avatar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

function Navbar() { 
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
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG9Cpn5vxKV4sd6sNcK4mhsL5IibaQxPzNSg&usqp=CAU" />
            </IconButton>
            </div>
        </div>
    )
}

export default Navbar
