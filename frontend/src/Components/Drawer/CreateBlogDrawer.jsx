import React from 'react'
import { Link } from 'react-router-dom'
import { IoCreateOutline } from "react-icons/io5";

const CreateBlogDrawer = ({size}) => {
  return (
    <Link to='/createblog'
    className='flex flex-row items-center  hover:bg-usernamecolor
     px-4 rounded-md w-[200px]'>
        <div className='flex justify-center mr-2'>
            <IoCreateOutline size={size}/>
        </div>
        <p className='text-black text-lg font-semibold cursor-default'>CreateBlog</p>
    </Link>
  )
}

export default CreateBlogDrawer