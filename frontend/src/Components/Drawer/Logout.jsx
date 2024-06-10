import React, { useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import toast from 'react-hot-toast'

const Logout = ({ size }) => {

  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout",{
        credentials: 'include'
      })

      const data = await res.json()

      if (data.error) throw new Error(error.message)

      window.location.assign('http://localhost:5173/login')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div onClick={() => handleLogout()}
    className='flex flex-row items-center hover:bg-usernamecolor
     px-4 rounded-md w-[200px]'>
        <div className='flex justify-center mr-2'>
            <IoIosLogOut 
            className='text-black'
            size={size}/>
        </div>
        <p className='text-black text-lg font-semibold cursor-default'>{loading ? <span className='loading loading-spinner'></span> : "Logout"}</p>
    </div>
  )
}

export default Logout