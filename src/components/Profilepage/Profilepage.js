import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../Firebase'
import './Profilepage.css'
import Chirp from '../Chirps/Chirp';

function Profilepage() {

    const [myuser] = useAuthState(auth);
    const [chirps] = useCollection(db.collection("messages").orderBy("timestamp","desc"))

    return (
        <>
            <div className="profilecontainer" >
                <div>
                    <img src={myuser.photoURL} />  <span>{myuser.displayName}</span>
                    <div>
                        {myuser.email}
                    </div> 
                    <div>
                        joined {myuser.metadata.creationTime}                        
                    </div>                     
                </div>   
            </div> 
            <div>
            {chirps?.docs.map((doc) => {
                        const { message , timestamp , user , userpic , location } = doc.data();
                        if(userpic === myuser.photoURL){
                            return(
                                <Chirp
                                key={doc.id}
                                message={message}
                                timestamp={timestamp}
                                user={user}
                                userimage={userpic}
                                location={location}
                                />
                                )
                            }
                    })}
            </div>
        </>
    )
}

export default Profilepage
