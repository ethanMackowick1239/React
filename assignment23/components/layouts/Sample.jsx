
import React, { useState, useEffect } from 'react'

const Sample = () => {

    const [count, setCount] = useState(0)
    // componentdidmount ===> init 
    // componentdidupdate =====> 
    // can be handled by useEffect () 
    useEffect(() => {
        document.title = `You clicked ${count} times`;

    })
    return (
        <div>
     <p>You clicked {count}</p>       
     <button onClick={()=>setCount(count+1)}>click me</button>
        </div>
    )
}

export default Sample;
