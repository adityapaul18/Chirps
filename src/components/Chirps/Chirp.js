import React from 'react'
import './Chirp.css'

function Chirp({message , timestamp , user , userimage , location}) {
    return (
        <div>
            <img src={userimage} alt="sdfsdf" />
            <div>
                <div>{user}</div>
                <div>{(timestamp?.toDate()).toLocaleTimeString('en-US') } </div>
                <div>{location}</div>
                <div>{message}</div>
            </div>
        </div>
    )
}

export default Chirp
