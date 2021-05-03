import React, { useEffect } from 'react'
import { db } from '../../Firebase'
import './Homepage.css'
import { useCollection } from 'react-firebase-hooks/firestore';
import Chirp from '../Chirps/Chirp';
import Inputpage from '../Inputpage/Inputpage';
import Sidemenu from '../Sidemenu/Sidemenu.js';
import Spinner from 'react-spinkit'

function Homefeed() {

    const [chirps,loading] = useCollection(db.collection("messages").orderBy("timestamp","desc"))
    useEffect(() => {
        console.log(chirps?.docs());
    },[])

    return (
        <div className="homepage" >
            <div className="homefeed">
                <div className="left_container">
                <div className="home-left" >
                    <Sidemenu/>
                </div>
                </div>
                <div className="home-mid" >
                    {loading ? <div className="loader" ><Spinner name="wandering-cubes" color="#0166C0"/></div> : <>{chirps?.docs.map((doc) => {
                        const { message , timestamp , user , userpic , location , image } = doc.data();
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
