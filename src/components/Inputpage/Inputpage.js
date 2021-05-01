import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../Firebase'
import './Inputpage.css'
import firebase from 'firebase'
import { useHistory } from 'react-router'
import FileBase from 'react-file-base64';
import { Button } from '@material-ui/core'

function Inputpage() {
    const [chirp,setchirp] =useState("")
    const [loct,setloct] =useState("")
    const [img,setimg] =useState("")
    const history = useHistory();
    const [user] = useAuthState(auth);
    const addchirp = async (e) => {
        e.preventDefault();
        
        await db.collection("messages").add({
            user: user.displayName ,
            userpic: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: chirp ,
            location : loct,
            image: img
        });
        history.push('/');
        setchirp("");
        setloct("");
        setimg("");
    }  


    return ( 
        <>
        <div className="inputpage" >
            <form className="inputform">
                <div>
                    <div className="post_imgcont" onClick={() => {setimg("")}} style={{backgroundImage: `url(${img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwbOTPYc5-lT_XmX__i6XBv4IRjC3iWhJhA&usqp=CAU"})`}}></div>
                    <div className="inputcontainers" ><input id="chirp" placeholder="Whats on your mind ?" autocomplete="off" value={chirp} onChange={(e) => setchirp(e.target.value)} /></div>
                    <div className="inputcontainers" ><input id="loct" placeholder="Add location"  autocomplete="off" value={loct} onChange={(e) => setloct(e.target.value)} /></div>
                    <div ><FileBase type="file" value={img} multiple={false} onDone={({ base64 }) => setimg(base64)} /> </div>
                </div>
                <div className="submit_button"><Button variant="contained" className="submitbutton" type="submit" onClick={addchirp}>Chirp</Button> </div>
            </form> 
        </div>
        </>
    )
}

export default Inputpage
