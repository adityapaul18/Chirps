import React, { useState } from 'react'
import ReactModal from 'react-modal';


function Test() {
    const [modalIsOpen,setIsOpen] = useState(true);

    return (
        <div>
            <ReactModal isOpen={modalIsOpen}><div>jhjbghgjkshgkjhg</div></ReactModal>
        </div>
    )
}

export default Test
