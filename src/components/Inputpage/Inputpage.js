import React, { useState, useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, storage } from '../../Firebase'
import './Inputpage.css'
import firebase from 'firebase'
import { useHistory } from 'react-router'
import FileBase from 'react-file-base64';
import { Button, TextField } from '@material-ui/core'
import Spinner from 'react-spinkit'

function Inputpage() {
    const [chirp, setchirp] = useState("")
    const [loct, setloct] = useState("")
    const [img, setimg] = useState("")
    const [upimg, setupimg] = useState("");
    const [bg, setbg] = useState("");
    const [loader, setloader] = useState(0);
    const history = useHistory();
    const [user] = useAuthState(auth);
    const ref = useRef()
    
    const ff = (e) => {
        var kk= URL.createObjectURL(e.target.files[0])
        setbg(kk)
    }

    const addchirp = async (e) => {
        e.preventDefault();

        if (upimg) {
            setloader(1)
            storage.ref(`images/${upimg.name}`).put(upimg)
                .then(() => {
                    storage.ref('images').child(upimg.name).getDownloadURL().then(url => {
                        console.log(url);
                        db.collection("messages").add({
                            user: user.displayName,
                            userpic: user.photoURL,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            message: chirp,
                            location: loct,
                            image: url,
                            mailid: user.email,
                            likes: [],
                            comments: []
                        });
                        setchirp("");
                        setloct("");
                        setimg("");
                        setbg("")
                        history.push('/');
                        setloader(0)
                    })
                })
        }
        else {

            if (chirp === "" && img === "") {
                alert("cannot post empty chirp");
                return;
            }
            setloader(1)
            await db.collection("messages").add({
                user: user.displayName,
                userpic: user.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: chirp,
                location: loct,
                image: img,
                mailid: user.email,
                likes: [],
                comments: []
            });
            setchirp("");
            setloct("");
            setimg("");
            setloader(0)
            setbg("")
            history.push('/');

        }

    }


    return (
        <>
            <div className="inputpage" >
                <form className="inputform">
                    {
                        loader ?
                            <>
                                <div className="loader" ><Spinner name="wandering-cubes" color="#0166C0" /></div>
                            </> : <>
                                <div>
                                    <div className="post_imgcont" onClick={() => { setbg("") }} style={{ backgroundImage: `url(${bg || "https://firebase.google.com/images/social.png"})` }}></div>
                                    <TextField variant="outlined" label="Add a caption" value={chirp} onChange={(e) => setchirp(e.target.value)} />
                                    <TextField variant="outlined" label="Tag Location" value={loct} onChange={(e) => setloct(e.target.value)} />
                                    <div className="inputimager" style={{ display: "none" }} >  <input ref={ref} type="file" onChange={(e) => {setupimg(e.target.files[0]); console.log(e.target);ff(e) }} /> </div>
                                </div>
                                <Button variant="contained" onClick={(e) => { e.preventDefault(); ref.current.click() }} className="submitbutton" type="submit" >Add image</Button>
                                <div className="submit_button">
                                    <Button variant="contained" className="submitbutton" type="submit" onClick={addchirp}>Chirp</Button>
                                </div>
                            </>
                    }
                </form>
            </div>
        </>
    )
}

export default Inputpage
