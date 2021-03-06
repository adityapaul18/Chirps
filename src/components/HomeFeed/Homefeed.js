import React from 'react'
import Inputpage from '../Inputpage/Inputpage'
import './Homepage.css'

function Homefeed() {
    return (
        <div className="homepage" >
            <div className="homefeed">
                <div className="home-left" >userinfo</div>
                <div className="home-mid" >
                    posts
                    <div className="chirp-body" >
                        <div>aditya paul</div>
                        <div>email id</div>
                        <div>timestamp</div>
                        <div>tweet</div>
                    </div>
                </div>
                <div className="home-right" >input form</div>
            </div>
        </div>
    )
}

export default Homefeed
