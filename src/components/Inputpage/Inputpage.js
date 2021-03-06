import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../Firebase'
import './Inputpage.css'
import firebase from 'firebase'
import { useHistory } from 'react-router'

function Inputpage() {
    const [chirp,setchirp] =useState("")
    const [loct,setloct] =useState("")
    const history = useHistory();
    const [user] = useAuthState(auth);
    const [check,setcheck] = useState(false)
    const addchirp = async (e) => {
        e.preventDefault();
        
        db.collection("messages").add({
            user: user.displayName ,
            userpic: user.photoURL,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: chirp ,
            location : loct
        });
        history.push('/');
        setchirp("");
        setloct("");
    }  


    return (
        <>
        <div className="inputpage" >
            <form className="inputform">
                <div>
                    <div className="inputcontainers" ><input id="chirp" placeholder="add a chirp" autocomplete="off" value={chirp} onChange={(e) => setchirp(e.target.value)} /></div>
                    <div className="inputcontainers" ><input id="loct" placeholder="add location"  autocomplete="off" value={loct} onChange={(e) => setloct(e.target.value)} /></div>
                </div>
                <div><button className="submitbutton" type="submit" onClick={addchirp}>Chirp</button> </div>
            </form> 
        </div>
        </>
    )
}

export default Inputpage
