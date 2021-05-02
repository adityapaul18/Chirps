import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../Firebase'
import './Profilepage.css'
import Chirp from '../Chirps/Chirp';
import Sidemenu from '../Sidemenu/Sidemenu'
import Inputpage from '../Inputpage/Inputpage'
import { Avatar } from '@material-ui/core'

function Profilepage() {

    const [myuser] = useAuthState(auth);
    const [chirps] = useCollection(db.collection("messages").orderBy("timestamp","desc"))
    const cutdate3 = (str) => {
        let l = str.length
        return str.substr(0, l-12) ;
    };
    const dd3 = myuser?.metadata.creationTime
    return (
        <>
            <div className="profilecontainer" >
                <p>  
                <Avatar className="profile_avatar" src={myuser.photoURL} alt={myuser.displayName}/>
                <div className="profile_header">
                    <div>
                        <p>{myuser.displayName}</p>
                        {myuser.email}
                    </div> 
                    <div>
                        joined at {cutdate3(dd3)}                        
                    </div>                     
                </div>   
                <div></div>
                <div></div>
                </p>
            </div> 
            <div className="profile_lower">
            <div className="profile-left" >
                    {/* <Sidemenu/> */}
            </div>
            <div className="home-mid">
            {chirps?.docs.map((doc) => {
                        const { message , timestamp , user , userpic , location , image } = doc.data();
                        if(userpic === myuser.photoURL){
                            return(
                                <Chirp
                                _id={doc.id}
                                key={doc.id}
                                message={message}
                                timestamp={timestamp}
                                user={user}
                                userimage={userpic}
                                location={location}
                                pic={image}
                                />
                                )
                            }
                    })}
            </div>
            <div className="profile-right" ><div>
                {/* <Inputpage/> */}
                </div></div>
            </div>

        </>
    )
}

export default Profilepage
