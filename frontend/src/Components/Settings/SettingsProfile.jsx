import React, { useState } from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import toast from 'react-hot-toast'

const SettingsProfile = () => {
  const { user } = useAuthContext()
  // this is another state so unless he push the update profile then nothing changes 
  // other than the UI he's currently on
  const [userinfo, setUserinfo] = useState(user?.user)
  const [loading, setLoading] = useState(false)
  console.log(userinfo)
  const handleupdateProfile = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/users/profile/updateprofile", {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userinfo),
        credentials: 'include'
      })

      const data = await res.json()

      if(data.error) throw new Error(data.error)
      console.log(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-full w-full max-w-[600px] pt-10 pl-3'>
      <div className='flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>Profile</h2>
        <span className='divider my-1'></span>
        <div className='flex flex-col gap-4'>
          {userinfo?.username && 
          <label className='flex flex-col font-semibold'>
            username
            <input 
            type='text'
            value={userinfo?.username}
            onChange={(e) => setUserinfo({...userinfo, username: e.target.value})}
            className='w-[300px] pl-2 h-[35px] rounded-md border border-usernamecolor font-normal'
            />
          </label>}
          <label className='flex flex-col font-semibold'>
            Name
            <input 
            type='text'
            value={userinfo?.displayName}
            onChange={(e) => setUserinfo({...userinfo, displayName: e.target.value})}
            className='w-[300px] pl-2 h-[35px] rounded-md border border-usernamecolor font-normal'
            />
          </label>
          <label className='flex flex-col font-semibold'>
            email
            <input 
            type='text'
            value={userinfo?.email}
            onChange={(e) => setUserinfo({...userinfo, email: e.target.value})}
            className='w-[300px] pl-2 h-[35px] rounded-md border border-usernamecolor font-normal'
            />
          </label>
          <label className='flex flex-col font-semibold'>
            Bio
            <textarea 
            type='text'
            value={userinfo?.Bio}
            onChange={(e) => setUserinfo({...userinfo, Bio: e.target.value})}
            className='w-[400px] h-[150px] pl-2 rounded-md border border-usernamecolor font-normal'
            />
          </label>
        </div>
        <span className='divider my-1'></span>
        <button onClick={() => handleupdateProfile()}
        className='btn max-w-[150px] h-[30px]'>{loading ? <span className='loading loading-spinner'></span> : "update Profile"}</button>
      </div>
    </div>
  )
}

export default SettingsProfile