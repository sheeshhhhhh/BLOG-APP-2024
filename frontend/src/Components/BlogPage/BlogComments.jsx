import React from 'react'
import BlogComment from './BlogComment'

const BlogComments = ({ Comments }) => {


  // need to have css for design
  return (
    <div className='flex flex-col gap-2'>
        {Comments?.map((comment) => {
          return (
            <div key={comment?._id}>
              <BlogComment
              comment={comment} />
            </div>
          )
        })}
    </div>
  )
}

export default BlogComments