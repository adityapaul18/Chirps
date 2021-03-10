import React from 'react'
import './Chirp.css'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function Chirp({message , timestamp , user , userimage , location}) {
    
    const cutdate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) : str;
    };
    const cutdate2 = (str) => {
        let l = str.length
        return str.substr(0, l-6) + str.substr(l-3,l);
    };
    const dd1 = new Date(timestamp?.toDate()).toUTCString('en-US') ;
    const dd2 = new Date(timestamp?.toDate()).toLocaleTimeString('en-US') 
    return (
        <div className="chirp_box">
            <div><img className="userimage" src={userimage} alt="sdfsdf" /></div>
            <div className="chirpbox_details">
                <div className="userdetails" ><b>{user}</b> <span className="timedetatils">{cutdate(dd1,17)} {cutdate2(dd2)}  </span></div>
                {location ? (<div className="loctdetails" > <LocationOnIcon/> {location}</div>) : (<div className="noloctdetails" > </div>) }
                <hr/>
                <div className="messagedetails" >{message}</div>
                <div className="chirpoptions" >
                    <ThumbUpIcon/>
                    <ThumbDownAltIcon/>
                    <DeleteIcon/>
                </div>
            </div>
        </div>
    )
}

export default Chirp