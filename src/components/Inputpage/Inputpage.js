import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../Firebase'
import './Inputpage.css'

function Inputpage() {
    const [chirp,setchirp] =useState("")
    const [loct,setloct] =useState("")

    const [user] = useAuthState(auth);


    const addchirp = (e) => {
        e.preventDefault();

        db.collection("messages").add({
            user: user.displayName ,
            userpic: user.photoURL,
            message: chirp ,
            location : loct
        });
        setchirp("");
        setloct("");
    }


    return (
        <>
        <div className="inputpage" >
            <form className="inputform">
                <div>
                    <div className="inputcontainers" ><input id="chirp" placeholder="add a chirp" type="text" value={chirp} onChange={(e) => setchirp(e.target.value)} /></div>
                    <div className="inputcontainers" ><input placeholder="add location"  type="text" value={loct} onChange={(e) => setloct(e.target.value)} /></div>
                </div>
                <div><button className="submitbutton" type="submit" onClick={addchirp}>Chirp</button> </div>
            </form> 
        </div>
        </>
    )
}

export default Inputpage
