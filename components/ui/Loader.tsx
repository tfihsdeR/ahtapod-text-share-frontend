import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = () => {
    return (
        <ClipLoader className='block m-0 border-red-800' size={150} color={"#123abc"} loading={true} />
    )
}

export default Loader
