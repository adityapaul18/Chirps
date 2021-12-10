import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, storage } from '../../Firebase'
import './Inputpage.css'
import firebase from 'firebase'
import { useHistory } from 'react-router'
import FileBase from 'react-file-base64';
import { Button, TextField } from '@material-ui/core'

function Inputpage() {
    const [chirp, setchirp] = useState("")
    const [loct, setloct] = useState("")
    const [img, setimg] = useState("")
    const [upimg, setupimg] = useState("");
    const history = useHistory();
    const [user] = useAuthState(auth);

    const addchirp = async (e) => {
        e.preventDefault();

        if (upimg) {

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
                        history.push('/');
                    })
                })
        }
        else {

            if (chirp === "" && img === "") {
                alert("cannot post empty chirp");
                return;
            }
            history.push('/');
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


        }

    }


    return (
        <>
            <div className="inputpage" >
                <form className="inputform">
                    <div>
                        <div className="post_imgcont" onClick={() => { setimg("") }} style={{ backgroundImage: `url(${upimg || "https://firebase.google.com/images/social.png"})` }}></div>
                        <TextField variant="outlined" label="Add a caption" value={chirp} onChange={(e) => setchirp(e.target.value)} />
                        <TextField variant="outlined" label="Tag Location" value={loct} onChange={(e) => setloct(e.target.value)} />
                        <div className="inputimager">  <input type="file" onChange={(e) => setupimg(e.target.files[0])} /> </div>
                    </div>
                    <div className="submit_button"><Button variant="contained" className="submitbutton" type="submit" onClick={addchirp}>Chirp</Button> </div>
                    {/* <div className="submit_button"><Button variant="contained" className="submitbutton" type="submit" onClick={uploadimg}>Chirp</Button> </div> */}
                </form>
            </div>
        </>
    )
}

export default Inputpage
