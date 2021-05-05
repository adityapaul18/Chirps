import React, { useState } from 'react'
import './Chirp.css'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Button } from '@material-ui/core/';
import { auth, db } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

function Chirp({_id, message , timestamp , user , userimage , location , pic ,likes }) {
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
     const [likedby,loading] = useCollection(db.collection("messages")?.doc(_id).collection("nlikes").orderBy("name","desc"))
    //  const [checkname, setcheckname] = useState("") 

    const likepost = async (myusern) => {
    
        let f = false;
        let checkname = ""
        await (likedby?.docs.map((usernm) => {
            const {name ,id } = usernm.data() 
            console.log(name)
            console.log(user)
            if(name === myuser.email ){
                f=true;
                checkname=user
                console.log(checkname)
                console.log("checked")
            }
        }))
        console.log(f)
        if(f===false){
            await db.collection("messages")?.doc(_id).collection("nlikes").add({
                name: myuser.email
            });
            await db.collection("messages").doc(_id).update({likes: likes+1});
            console.log("new user added")

        }
    }
    
    const dd1 = new Date(timestamp?.toDate()).toUTCString('en-US') ;
    const dd2 = new Date(timestamp?.toDate()).toLocaleTimeString('en-US') 
    return (<>
    
    <div className="post_box">
        <div className="chirp_box">
            <div><img className="userimage" src={userimage} alt="sdfsdf" /></div>
            <div className="chirpbox_details">
                <div className="userdetails" ><b>{user}</b> <p className="timedetatils">{cutdate(dd1,17)} {cutdate2(dd2)}  </p></div>
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
                <div className="messagedetails" >{message}</div>
    </div>
                <div className="chirpoptions" >
                    <Button onClick={() => {likepost(myuser)}} className="likebtn"> <ThumbUpIcon/>{likes?.length}{"   "}Like</Button>
                    {myuser.photoURL === userimage ? (<p onClick={deletepost}><Button ><DeleteIcon/>Delete</Button></p>) : (<></>)}
                </div>
    </>
    )
}

export default Chirp
