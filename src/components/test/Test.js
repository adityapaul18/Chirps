import { Input, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import ReactModal from 'react-modal';
import './test.css'

function Test() {
    const [modalIsOpen,setIsOpen] = useState(true);
    const [comment,setcomment] = useState("");
    const customStyles = {
        content : {
        //   top                   : '50%',
        //   left                  : '50%',
        //   right                 : 'auto',
        //   bottom                : 'auto',
          marginTop          : '90px',
        //   transform             : 'translate(-50%, -50%)'
        }
      };

    return (
        <div>
            <ReactModal style={customStyles} isOpen={modalIsOpen}>
            <div className="comment_box">
                <div className="mimage_contain">
                    <div></div>
                    {/* <img className="modalimage" src="https://images-na.ssl-images-amazon.com/images/I/812phqzj4AL._AC_SX679_.jpg" alt=""/> */}
                </div>
                <div className="modal_comments">
                   <div className="comments">
                        <div>
                            <p>aditya paul</p>
                            <p>lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg </p>
                        </div>
                    </div>
                    <div className="comments">
                        <div>
                            <p>aditya paul</p>
                            <p>lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg </p>
                        </div>
                    </div>
                    <div className="comments">
                        <div>
                            <p>aditya paul</p>
                            <p>lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg </p>
                        </div>
                    </div>
                    <div className="comments">
                        <div>
                            <p>aditya paul</p>
                            <p>lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg </p>
                        </div>
                    </div>
                    <div className="comments">
                        <div>
                            <p>aditya paul</p>
                            <p>lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg </p>
                        </div>
                    </div>
                    <div className="comments">
                        <div>
                            <p>aditya paul</p>
                            <p>lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg </p>
                        </div>
                    </div>
                    <div className="comments">
                        <div>
                            <p>aditya paul</p>
                            <p>lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg </p>
                        </div>
                    </div><div className="comments">
                        <div>
                            <p>aditya paul</p>
                            <p>lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg lorem qfasf asfasfa fa sfasfasfa sfas sbdsgsd gsdg sdgs dgsdgsd g s dg </p>
                        </div>
                    </div> 
                    
                   <div className="comment_window">
                       <Input className="comment window" placeholder="Add a caption" value={comment} onChange={(e) => setcomment(e.target.value)}/>
                   </div>
                </div>
            </div>
            </ReactModal>
        </div>
    )
}

export default Test
