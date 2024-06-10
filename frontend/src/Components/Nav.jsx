import React from 'react'
import { Link } from 'react-router-dom'
import Drawer from './Drawer/Drawer'

const Nav = () => {

    return (
        <div className='w-full h-[60px] flex flex-row justify-between px-[200px] bg-usernamecolor py-2 sticky top-0 '>
            <Drawer />
            <div className='flex justify-center'>
                <Link className='h-[25px]'
                to={'/settings/profile'}>
                    <button className='btn min-h-[40px] h-[25px]'>Settings</button>
                </Link>
            </div>
        </div>
    )
}

export default Nav