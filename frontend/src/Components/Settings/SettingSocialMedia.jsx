import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaLink } from "react-icons/fa6";
import { useAuthContext } from '../../Context/AuthContext';

const SettingSocialMedia = () => {

  const [loading, setLoading] = useState(false)
  const [link, setLink] = useState(['', '', '', ''])
  console.log(link)

  const { user } = useAuthContext()

  useEffect(() => {
    const getlink = async () => {
      setLoading(true)
      try {
        
        const res = await fetch("http://localhost:5000/api/users/profile/" + user?.user?._id)
        const data = await res.json()
        if(data.error) throw new Error(data.error)
        
        if(!data.Links) return
        
        setLink(data.Links)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    getlink()
  }, [])

  const handleSocialmedia = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/users/profile/updatesocialmedia", {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(link),
        credentials: 'include'
      })

      const data = await res.json()
      console.log(data)
      if(data.error) throw new Error(data.error)

      setLink(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (value, num) => {
    const newarr = [...link]
    newarr[num] = value
    setLink(newarr)
  }

  return (
    <div className='h-full w-full max-w-[600px] pt-10 pl-3'>
        <h2 className='font-bold text-2xl'>Social Media</h2>
        <span className='divider my-1'></span>
        <div className='flex flex-col gap-2'>
            <p className='text-sm text-usernamecolor'>
                You can link your account by copying the url 
                of the <br /> account of your social media and pasting it here.
            </p >
            <p className='text-md text-usernamecolor font-semibold'>example: www.example.com/blogphilippines</p>
            <div className='flex pl-2 gap-1 items-center'>
                <FaLink size={20} />
                <input 
                value={link[0]}
                onChange={(e) => handleChange(e.target.value, 0)}
                type='text' 
                className='w-[300px] pl-2 h-[35px] rounded-md border border-usernamecolor font-normal' />
            </div>
            <div className='flex pl-2 gap-1 items-center'>
                <FaLink size={20} />
                <input 
                value={link[1]}
                onChange={(e) => handleChange(e.target.value, 1)}
                type='text' 
                className='w-[300px] pl-2 h-[35px] rounded-md border border-usernamecolor font-normal' />
            </div>
            <div className='flex pl-2 gap-1 items-center'>
                <FaLink size={20} />
                <input 
                value={link[2]}
                onChange={(e) => handleChange(e.target.value, 2)}
                type='text' 
                className='w-[300px] pl-2 h-[35px] rounded-md border border-usernamecolor font-normal' />
            </div>
            <div className='flex pl-2 gap-1 items-center'>
                <FaLink size={20} />
                <input 
                value={link[3]}
                onChange={(e) => handleChange(e.target.value, 3 )}
                type='text' 
                className='w-[300px] pl-2 h-[35px] rounded-md border border-usernamecolor font-normal' />
            </div>
        </div>
        <button onClick={() => handleSocialmedia()}
        className='btn h-[40px] max-w-[150px] w-[100%] mt-7'>update</button>
    </div>
  )
}

export default SettingSocialMedia