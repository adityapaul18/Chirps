import { IconButton, Input, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import ReactModal from 'react-modal';
import './test.css'
import SendIcon from '@material-ui/icons/Send';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import firebase from 'firebase'

function Test({chirpid,mode,setchirpid,setIsOpen}) {
    const [user] = useAuthState(auth);
    setchirpid(chirpid)
    const [reqdoc,loading] = useCollection(db.collection("messages").doc(chirpid))
    const [reqcom,loadig] = useCollection(db.collection("messages").doc(chirpid).collection("comments").orderBy("timestamp","asc"))
    
    
    const [comment,setcomment] = useState("");
    const customStyles = {
        content : {
            marginTop          : '70px',
        }
    };
    const addcomment = async () => {
        if(!comment){
            alert("plz add a comment")
            return;
        }
        await db.collection("messages").doc(chirpid).collection("comments").add({
            name: user.displayName,
            comment: comment,
            mail: user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        await db.collection("messages").doc(chirpid).update({comments:reqdoc.docs().comment+1});
        //  console.log(doccom)
        setcomment("")
    }
    const cutdate = (str, n) => {
        return str?.length > n ? str.substr(5, n - 5) : str;
    };
    const cutdate2 = (str) => {
        let l = str.length
        return str.substr(0, l-6) + str.substr(l-3,l);
    };
    const img = (reqdoc?.data().image || user?.photoURL)
    const pic = user?.photoURL
    return (
        <div>
            <ReactModal style={customStyles} isOpen={mode}>
            <div className="comment_box">
                <HighlightOffIcon className="closer" onClick={() => {setIsOpen(!mode)}} />
                <div className="mimage_contain" style={{backgroundImage: `url(${img || pic })`}}>
                    <div></div>
                    {/* <img className="modalimage" src="https://images-na.ssl-images-amazon.com/images/I/812phqzj4AL._AC_SX679_.jpg" alt=""/> */}
                </div>
                <div className="modal_comments">
                   <div className="modal_comments_cont">
                       {reqcom?.docs.map((coment) => {
                           const {name , comment , timestamp} = coment?.data()
                           const dd4 = new Date(timestamp?.toDate()).toUTCString('en-US') ;
                           const dd3 = new Date(timestamp?.toDate()).toLocaleTimeString('en-US') 
                           return(
                               <div className="comments">
                           <div>
                               <p className="commentname">{name}<span>{" "}@{cutdate2(dd3)} {cutdate(dd4,17)} </span></p>
                               <p className="commentval">{comment}</p> 
                           </div>
                       </div>
                               )
                       })

                       }
                  

                   </div>
                   <div className="comment_window">
                       <Input className="comment window" placeholder="Add comment" value={comment} onChange={(e) => setcomment(e.target.value)}/>
                       <span onClick={addcomment} className="add_combtn"><IconButton><SendIcon/></IconButton></span>
                   </div>
                </div>
            </div>
            </ReactModal>
        </div>
    )
}

export default Test
