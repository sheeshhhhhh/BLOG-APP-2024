import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import ChildComment from './ChildComment'

const BlogComment = ({ comment }) => {
  const [loading, setLoading] = useState(false)
  const [childcomments, setChildComment] = useState()

  const getchildcomment = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/blog/getchildcomment" + comment._id, {
        credentials: 'include'
      })

      const data = await res.json()

      if(data.error) throw new Error(data.error)

      setChildComment(data.childcomments)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col px-2 justify-center'>
      <div className='flex flex-row '>
        <Link className=' size-12 rounded-full'>
          <img className='size-12 rounded-full'
          src={comment?.User?.avatarUrl ? comment?.User?.avatarUrl : ''} />
        </Link>
        <div className='flex flex-col gap-1 w-full max-w-[400px] px-2'>
           <p className='font-bold text-sm'>{comment?.User?.displayName}</p>
           <p className='text-start text-md'>{comment?.body}</p>
        </div>
      </div>
      <p className=' cursor-pointer hover:underline max-w-[50px]'>
        reply
      </p>
      <div>
        <p>{comment.childcomments?.length > 0 && !childcomments && `${comment.childcomments.length} replies`}</p>
        {childcomments && childcomments?.map((childcomment) => {
          return (
            <div key={childcomment?._id}>
              <ChildComment childcomment={childcomment} />
            </div>
        )
        })}
      </div>
    </div>
  )
}

export default BlogComment