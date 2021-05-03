import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../Firebase'
import './Profilepage.css'
import Chirp from '../Chirps/Chirp';
import { Avatar, Button } from '@material-ui/core'
import { useHistory } from 'react-router'
import Spinner from 'react-spinkit'
import Thoughtbox from '../Thougthbox/Thoughtbox'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import image from "../../images/head.png"
import Navbar from '../Navbar/Navbar'

function Profilepage() {

    const [myuser] = useAuthState(auth);
    const [chirps,loading] = useCollection(db.collection("messages").orderBy("timestamp","desc"))
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
                <Avatar className="profile_avatar2" src={myuser.photoURL} alt={myuser.displayName}/>
                <p>  
                <div className="profile_header">
                    <div>
                        <p>{myuser.displayName}</p>
                        {myuser.email}
                    </div> 
                    <div>
                        joined at {cutdate3(dd3)}                        
                    </div>                     
                </div>   
                </p>
            </div> 
            <div className="hidder">            </div>
            <div className="profile_lower">
                
            <div className="profile-left" >        
                <Avatar className="profile_avatar" src={myuser.photoURL} alt={myuser.displayName}/>
                <Button onClick={() => {history.push("./")}} variant="contained">Home</Button>
                <Button onClick={() => {history.push("./profile")}} variant="contained">Profile</Button>
                <Button variant="contained"><a href="https://github.com/adityapaul18/Chirps">Github</a></Button>
                <Button variant="contained"><a href="https://adityapaul.herokuapp.com/">Contact</a></Button>
            
                <div className="logoutbtn">
                <Button onClick={signout}>logout</Button>
                    <div>Made By Aditya Paul</div> 
                </div>
                

            </div>

            <div className="prof-mid">
            {loading ? <div className="loader" ><Spinner name="wandering-cubes" color="#0166C0"/></div> : 
            <>
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
                    })}</>}
            </div>
            <div className="profile-right" >
                <span><ExpandMoreIcon/></span>
                <Thoughtbox/>
            </div>
            
        </div>
        </>
    )
}

export default Profilepage
