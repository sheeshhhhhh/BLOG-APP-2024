import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const HomeDrawer = ({size}) => {
  return (
    <Link to={'/'}
    className='flex flex-row items-center hover:bg-usernamecolor
    px-4 rounded-md w-[200px]'>
        <div className='flex justify-center mr-2'>
            <IoHomeOutline size={size} />
        </div>
        <p className='text-black text-lg font-semibold cursor-default'>Home</p>
    </Link>
  )
}

export default HomeDrawer