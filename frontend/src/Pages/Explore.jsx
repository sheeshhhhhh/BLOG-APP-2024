import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import Search from '../Components/Explore/Search'
import DisplayBlog from '../Components/Explore/DisplayBlog'

const Explore = () => {
  const [blogs, setBlogs] = useState()
  const [page, setPage] = useState()

  console.log(blogs)

  useEffect(() => {
    const getblogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blog/getallblogs', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({ page: page })
        })

        const data = await res.json()
        if(data.error) throw new Error(data.error)

        setBlogs(data)
      } catch (error) {
        toast.error(error.message)
      }
    }
    getblogs()
  }, [])
    
  return (
    <div>
        <Search setBlogs={setBlogs} />
        <DisplayBlog blogs={blogs} />
    </div>
  )
}

export default Explore