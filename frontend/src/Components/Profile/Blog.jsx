import React from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../utils/formatedate'

const Blog = ({Blog, profile}) => {
    // design the blogs later
    const Blogdate = formatDate(Blog?.createdAt)

  return (
    <div>
      <Link 
      to={'/Blog/' + Blog?._id}
      className='flex flex-col gap-1 hover:bg-usernamecolor p-2 rounded-lg'>
        <h2 className='font-bold text-2xl'>{Blog?.title}</h2>
        {Blog?.HashTag && <p className='font-semibold text-md'>{Blog?.HashTag}</p>}
        <p className='text-sm'>Publish on: {Blogdate}</p>
        <Link to={`/profile/${profile._id}`}
        className='flex gap-1'>
          {profile.avatarUrl && (
            <div className='flex flex-col justify-center'>
              <img src={profile.avatarUrl} className='size-[40px] rounded-full border-2 border-slate-500' />
            </div>)
          }
          <div>
            <h2 className='font-normal text-md'>{profile.displayName}</h2>
            <p className='font-normal text-sm'>{profile.email}</p>
          </div>
        </Link>
      </Link>
    </div>
  )
}

export default Blog