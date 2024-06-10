import React, { memo, useState } from 'react'
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";


const Search = ({setBlogs}) => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState()

  const handleblogsearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if(!search) return
      const res = await fetch("http://localhost:5000/api/blog/getblogs/" + search, {
        method: 'GET',
        credentials: 'include'
      })

      const data = await res.json()

      if(data.error)throw new Error(data.error)
      
      setBlogs(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleblogsearch}
    className='py-2 h-[50px] border-0 flex flex-row justify-around'>
      <label className='flex flex-row items-center bg-slate-200 p-2 rounded-lg'>
        <input 
        placeholder='Search'
        disabled={loading}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-[250px] h-[30px] outline-none bg-slate-200 font-semibold text-black placeholder:text-stone-600 px-1'
        type='text' 
        />
        <button
        type='submit'
        >
          {!loading ? <HiOutlineMagnifyingGlass size={24} /> : <span className='loading loading-spinner'></span>}
        </button>
      </label>
    </form>
  )
}

export default memo(Search)