import { IconButton, Input, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import ReactModal from 'react-modal';
import './test.css'
import SendIcon from '@material-ui/icons/Send';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function Test({chirpid,mode,setchirpid,setIsOpen}) {
    const [user] = useAuthState(auth);
    setchirpid(chirpid)
    const [reqdoc,loading] = useCollection(db.collection("messages").doc(chirpid))
    const [reqcom,loadig] = useCollection(db.collection("messages").doc(chirpid).collection("comments"))

    const [comment,setcomment] = useState("");
    const customStyles = {
        content : {
          marginTop          : '90px',
        }
      };
    const addcomment = () => {
        db.collection("messages").doc(chirpid).collection("comments").add({
            name: user.displayName,
            comment: comment,
            mail: user.email
        })
        setcomment("")
    }
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
                           const {name , comment , mail} = coment?.data()
                           return(
                               <div className="comments">
                           <div>
                               <p>{name}</p>
                               <p>{comment}</p> 
                           </div>
                       </div>
                               )
                       })

                       }
                  

                   </div>
                   <div className="comment_window">
                       <Input className="comment window" placeholder="Add a caption" value={comment} onChange={(e) => setcomment(e.target.value)}/>
                       <span onClick={addcomment} className="add_combtn"><IconButton><SendIcon/></IconButton></span>
                   </div>
                </div>
            </div>
            </ReactModal>
        </div>
    )
}

export default Test
