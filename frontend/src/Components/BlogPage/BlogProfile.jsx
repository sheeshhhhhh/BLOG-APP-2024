import React from 'react'

const BlogProfile = ({Author}) => {
  return (
    <div className='flex flex-row gap-4'>
      <div className='flex flex-col justify-center items-center'>
        <img className='size-[50px] rounded-full border-2 border-slate-500'
        src={Author?.avatarUrl ? Author.avatarUrl : ""} />
      </div>
      <div className='flex flex-col justify-center'>
        <h2 className='font-semibold text-2xl'>By {Author.displayName}</h2>
      </div>
    </div>
  )
}

export default BlogProfile