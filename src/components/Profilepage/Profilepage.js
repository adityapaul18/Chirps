import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../Firebase'
import './Profilepage.css'
import Chirp from '../Chirps/Chirp';
import Sidemenu from '../Sidemenu/Sidemenu'
import Inputpage from '../Inputpage/Inputpage'
import { Avatar, Button } from '@material-ui/core'
import { useHistory } from 'react-router'

function Profilepage() {

    const [myuser] = useAuthState(auth);
    const [chirps] = useCollection(db.collection("messages").orderBy("timestamp","desc"))
    const cutdate3 = (str) => {
        let l = str.length
        return str.substr(0, l-12) ;
    };
    const dd3 = myuser?.metadata.creationTime

    const history = useHistory();
    const signout = () => {
        auth.signOut();
    }
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
                <Button onClick={() => {history.push("./")}} variant="contained">Home</Button>
                <Button onClick={() => {history.push("./profile")}} variant="contained">Profile</Button>
                <Button variant="contained"><a href="https://github.com/adityapaul18/Chirps">Github</a></Button>
                <Button variant="contained"><a href="https://adityapaul.herokuapp.com/">Contact</a></Button>
            
            
                <Button onClick={signout}>logout</Button>
                    <p>Made By Aditya Paul</p> 
                

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
                </div>
            </div>

        </div>
        </>
    )
}

export default Profilepage
