import React from 'react'
import { IoPerson } from "react-icons/io5";
import { useAuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';

const ProfileDrawer = ({size}) => {

  const { user } = useAuthContext()

  return (
    <Link to={`/profile/${user?.user?._id}`}
    className='flex flex-row items-center  hover:bg-usernamecolor
    px-4 rounded-md w-[200px]'>
        <div className='flex justify-center mr-2'>
            <IoPerson 
            size={size}
            className='text-black'
            />
        </div>
        <p className='text-black text-lg font-semibold cursor-default'>Profile</p>
    </Link>
  )
}

export default ProfileDrawer