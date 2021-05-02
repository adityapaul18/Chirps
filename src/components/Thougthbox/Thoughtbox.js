import React, { useEffect, useState } from 'react'
import "./Thoughtbox.css"

function Thoughtbox() {
    const [quotes,sequotes] = useState([])
    const quote = () => {
        fetch("https://type.fit/api/quotes")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
          console.log(data[1]);
          sequotes(data);
    });
}
useEffect(() => {
    quote();
    console.log("helllo")
    },[])
    return (
        <div className="quotes">
            {quotes?.map((quote) => {
                return(
                    <div className="quotlinne">
                    {quote.text}

                    <div className="quoteauth"><p>-{quote.author}</p></div>
                    </div>
                )
                
            })}
            
        </div>
    )
}

export default Thoughtbox
