import React, { useEffect } from 'react'
import { db } from '../../Firebase'
import './Homepage.css'
import { useCollection } from 'react-firebase-hooks/firestore';
import Chirp from '../Chirps/Chirp';
import Inputpage from '../Inputpage/Inputpage';
import Sidemenu from '../Sidemenu.js';


function Homefeed() {

    const [chirps,loading] = useCollection(db.collection("messages").orderBy("timestamp","desc"))
    useEffect(() => {
        console.log(chirps?.docs());
    },[])
    

    return (
        <div className="homepage" >
            <div className="homefeed">
                <div className="home-left" >
                    <Sidemenu/>
                </div>
                <div className="home-mid" >
                    {chirps?.docs.map((doc) => {
                        const { message , timestamp , user , userpic , location } = doc.data();
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
                    })}

                </div>
                <div className="home-right" ><Inputpage/></div>
            </div>
        </div>
    )
}

export default Homefeed
