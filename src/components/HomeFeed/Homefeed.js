import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase'
import './Homepage.css'
import { useCollection } from 'react-firebase-hooks/firestore';
import Chirp from '../Chirps/Chirp';
import Inputpage from '../Inputpage/Inputpage';
import Sidemenu from '../Sidemenu/Sidemenu.js';
import Spinner from 'react-spinkit'
import Test from '../test/Test';
import ReactModal from 'react-modal';


function Homefeed() {
    const [chirps,loading] = useCollection(db.collection("messages").orderBy("timestamp","desc"))
    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };
    const [modalIsOpen,setIsOpen] = useState(false);
    const [chirpid, setchirpid] = useState("PLJe0D0DWrrXmAbJP2g8")
    
    return (
        <div className="homepage" >
            <div className="homefeed">
                <div className="left_container">
                <div className="home-left" style={{zIndex:modalIsOpen? 0 : 1}}>
                    <Sidemenu/>
                </div>
                </div>
                <div className="home-mid" >
                <div className="modalbox">     
                     <Test 
                          chirpid={chirpid}
                          mode={modalIsOpen}
                          setIsOpen={setIsOpen}
                          setchirpid={setchirpid}
                     />                    
                </div>

                    {loading ? <div className="loader" ><Spinner name="wandering-cubes" color="#0166C0"/></div> : 
                    <>
                        {chirps?.docs.map((doc) => {
                        const { message , timestamp , user , userpic , location , image , likes , mailid , comments} = doc.data();
                        return(
                            <div>
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
                                    mode={modalIsOpen}
                                    setIsOpen={setIsOpen}
                                    setchirpid={setchirpid}
                                    comments={comments}
                                />
                            </div>
                        )
                    })}</> }
                    

                </div>
                <div className="inputbox">
                <div className="home-right" ><Inputpage/></div>
                </div>
            </div>
        </div>
    )
}

export default Homefeed
