import React, { useState } from 'react'
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
import Test from '../test/Test'


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

    const [modalIsOpen,setIsOpen] = useState(false);
    const [chirpid, setchirpid] = useState("PLJe0D0DWrrXmAbJP2g8")
    return (
        <div className="profile__page">
             <div className="modalbox">     
                     <Test 
                          chirpid={chirpid}
                          mode={modalIsOpen}
                          setIsOpen={setIsOpen}
                          setchirpid={setchirpid}
                     />                    
                </div>
            <div className="profilecontainer" style={{zIndex:modalIsOpen? 0 : 2}} >
                <Avatar className="profile_avatar2" src={myuser.photoURL || "https://st2.depositphotos.com/1032921/5237/v/600/depositphotos_52374307-stock-illustration-blue-profile-icon.jpg"} alt={myuser.displayName}>{myuser.displayName.charAt(0).toLocaleUpperCase()}</Avatar>
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
                
            <div className="profile-left" style={{zIndex:modalIsOpen? 0 : 2}} >        
                <Avatar className="profile_avatar" src={myuser.photoURL} alt={myuser.displayName}>{myuser?.displayName.charAt(0).toLocaleUpperCase()}</Avatar>
                <Button onClick={() => {history.push("./")}} variant="contained">Home</Button>
                <Button onClick={() => {history.push("./profile")}} variant="contained">Profile</Button>
                <Button variant="contained"><a href="https://github.com/adityapaul18/Chirps">Github</a></Button>
                <Button variant="contained"><a href="https://adityapaul.herokuapp.com/">Contact</a></Button>
            
                <div className="logoutbtn">
                <Button cariant="contained" onClick={signout}>logout</Button>
                    <div>Made By Aditya Paul</div> 
                </div>
                

            </div>

            <div className="prof-mid">
            {loading ? <div className="loader" ><Spinner name="wandering-cubes" color="#0166C0"/></div> : 
            <>
                {chirps?.docs.map((doc) => {
                const { message , timestamp , user , userpic , location , image , likes , mailid } = doc.data();
                if(mailid === myuser.email){
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
                        likes={likes}
                        email={mailid}
                        setIsOpen={setIsOpen}
                        setchirpid={setchirpid}
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
        </div>
    )
}

export default Profilepage
