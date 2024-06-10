import React from 'react'

const ChildComment = ({ childComment }) => {
  return (
    <div className='flex flex-row gap-2'>
        <div className='flex flex-col justify-center'>
            <img className='size-10 rounded-full'
            src={childComment?.User?.avatarUrl ? childComment?.User?.avatarUrl : ''} />
        </div>
        <div>
            <p>{childComment?.User?.displayName}</p>
            <p>{childComment?.body}</p>
        </div>
    </div>
  )
}

export default ChildComment