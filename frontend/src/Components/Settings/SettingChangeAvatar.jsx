import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { PiUploadDuotone } from "react-icons/pi";
import { useAuthContext } from '../../Context/AuthContext';

const SettingChangeAvatar = () => {
  const [file, setFile] = useState(null)
  const [userAvatar, setUserAvatar] = useState()
  const [loading, setLoading] = useState(true)

  const { user } = useAuthContext()

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleFileSelect = (event)  => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true)
      try {
        const res = await fetch("http://localhost:5000/api/users/profile/" + user?.user?._id, {
          credentials: 'include'
        })

        const data = await res.json()

        if(!data) return toast.error("No data Found")

        setUserAvatar(data?.avatarUrl)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUserProfile()
  }, [])

  const updateAvatar = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // e.target lang pala poita
      const formData = new FormData(e.target)
      const res = await fetch("http://localhost:5000/api/users/profile/updateAvatar", {
        method: "POST",
        body: formData,
        credentials: 'include'
      })

      const resdata = await res.json()

      console.log(resdata)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  if(loading) {
    return (
      <div className='w-full max-w-[600px] pt-10 pl-3 flex justify-center items-center'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    )
  }

  return (
    <form
    className='w-full max-w-[600px] pt-10 pl-3'
    action='http://localhost:5000/api/users/profile/updateAvatar'
    method="post"
    encType='multipart/form-data'
    name='image'
    onSubmit={updateAvatar}
    >
        <h2 className='font-bold text-2xl'>Change Avatar</h2>
        <span className='divider my-1'></span>
        <div>
          <h2>Preview:</h2>
          {userAvatar? 
          <img className='size-[200px] rounded-full border-2 border-slate-500'
          src={file ? file : userAvatar} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} /> 
          : <h2>No Profile yet</h2>
          }
        </div>
        <div 
        className='flex mt-4 gap-1 '>
          <label 
          onDrop={(event) => handleDrop(event)}
          onDragOver={(event) => handleDragOver(event)}
          className='flex flex-row text-lg p-2 px-3 font-bold text-white bg-red-600 gap-1 hover:bg-red-700 max-w-[200px]'>
              <div className='flex flex-col justify-center items-center'>
                <PiUploadDuotone size={22.5} />
              </div>
                Choose a file
              <input 
              name='image'
              hidden
              onChange={(event) => handleFileSelect(event)}
              type='file'
              />
          </label>
          <button 
          type='submit'
          className='btn'>{loading ? <span className='loading loading-spinner'></span> : "Update"}</button>
        </div>
    </form>
  )
}

export default SettingChangeAvatar