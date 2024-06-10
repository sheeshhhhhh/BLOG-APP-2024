import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import BlogContent from '../Components/BlogPage/BlogContent'
import BlogProfile from '../Components/BlogPage/BlogProfile'
import BlogComments from '../Components/BlogPage/BlogComments'
import BlogLoading from '../Components/BlogPage/BlogLoading'
import DropComment from '../Components/BlogPage/DropComment'
import { useAuthContext } from '../Context/AuthContext'

// responsible for viewing the blogs as pages 
// we should also have params to the link in react router dom
const Blog = () => {
  const [loading, setLoading] = useState(true)
  const [blog, setBlog] = useState()
  const { id } = useParams()

  const { user } = useAuthContext()

  
  useEffect(() => {
    const getBlog = async () => {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:5000/api/blog/getblog/${id}`)
        const data = await res.json()

        if (data.error) throw new Error(error.data)
        if(!data) throw new Error("can't find the blog")

        setBlog(data.blog)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    getBlog()
  }, [])


  return (
    <div className='h-full min-h-screen flex justify-center p-10'>
      {loading ? <BlogLoading /> :
      (
        <div className='flex flex-col gap-4 max-w-[900px] w-[100%]'>
          <h2 className='text-4xl font-bold mb-[20px]'>{blog.title}</h2>
          <BlogProfile Author={blog?.Author} />
          <BlogContent body={blog?.body} />
          <h2 className='text-xl font-bold pl-2 mb-3'>{blog?.Comments.length} Comments</h2>
          <DropComment blog={blog} setBlog={setBlog}
          user={user?.user} blogid={id} />
          <BlogComments Comments={blog?.Comments} />
        </div>
      )
      }
    </div>
  )
}

export default Blog