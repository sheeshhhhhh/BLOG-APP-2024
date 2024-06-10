import React from 'react'
import { Link } from 'react-router-dom'

const Explore = () => {
  return (
    <Link to={'/explore'}
    className='flex flex-row items-center hover:bg-usernamecolor
    px-4 rounded-md w-[200px]'>
        explore
    </Link>
  )
}

export default Explore