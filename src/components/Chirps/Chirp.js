import React from 'react'
import './Chirp.css'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Button } from '@material-ui/core/';
import { auth, db } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Chirp({_id, message , timestamp , user , userimage , location , pic }) {
    const [myuser] = useAuthState(auth);
    const cutdate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) : str;
    };
    const cutdate2 = (str) => {
        let l = str.length
        return str.substr(0, l-6) + str.substr(l-3,l);
    };
    const deletepost = () => {
        db.collection("messages").doc(_id).delete();
        console.log("deleted")
    }
    console.log(timestamp)
    const dd1 = new Date(timestamp?.toDate()).toUTCString('en-US') ;
    const dd2 = new Date(timestamp?.toDate()).toLocaleTimeString('en-US') 
    return (<>
        <div className="chirp_box">
            <div><img className="userimage" src={userimage} alt="sdfsdf" /></div>
            <div className="chirpbox_details">
                <div className="userdetails" ><b>{user}</b> <span className="timedetatils">{cutdate(dd1,17)} {cutdate2(dd2)}  </span></div>
                {location ? (<div className="loctdetails" > <LocationOnIcon/> {location}</div>) : (<div className="noloctdetails" > </div>) }
            </div>
        </div>
        {pic ? (
                <div className="postimg_container">
                    <img  src={pic} alt="" />
                </div>
            ) :(
                <div></div>
            )}
        <hr/>
                <div className="messagedetails" >{message}</div>
                <div className="chirpoptions" >
                    <ThumbUpIcon/>
                    <ThumbDownAltIcon/>
                    {myuser.photoURL === userimage ? (<><Button  onClick={deletepost} ><DeleteIcon/></Button></>) : (<></>)}
                </div>
        </>
    )
}

export default Chirp
