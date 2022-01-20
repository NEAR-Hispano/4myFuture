import React from 'react'
import User from '../../models/User';
import { useNear } from '../../hooks/useNear';
import { NearContext } from '../../context/nearContext';
interface DetailsProps {
    near: NearContext;
}

function details({near}: DetailsProps) {
    

    return (
        <div>
            <button onClick={()=> {console.log(near.contract)}}>
                TEST CONTEXT
            </button>
        </div>
    )
}

export default details
