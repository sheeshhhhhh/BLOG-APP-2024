import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Follow = ({handleFollow, handleUnfollow ,isfollowing}) => {
    const [loading, setLoading] = useState(false)

    return (
        <div className=' bg-blue-700 hover:bg-blue-800 p-1 rounded-md px-1 flex 
        justify-center items-center'>
            <button className='font-bold text-white text-sm'
            onClick={() => {isfollowing ? handleUnfollow(setLoading) : handleFollow(setLoading)}}
            >
                {loading ? <span className='loading loading-spinner size-3'></span> 
                : !isfollowing ? "Follow" : "followed"} 
            </button>
        </div>
    )
}

export default Follow