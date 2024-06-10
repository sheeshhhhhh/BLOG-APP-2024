import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { IoPerson } from "react-icons/io5";
import { HiOutlineEnvelope } from "react-icons/hi2";

import { useAuthContext } from '../../Context/AuthContext';
import lastelementofURL from '../../utils/lastelementofURL';

const SettingSideBar = () => {

    const { user } = useAuthContext()

    const URL = useLocation()
    const selectedSetting = lastelementofURL(URL)

    return (
        <div className='h-full flex flex-col min-w-[230px]'>
            <Link to={'../profile/' + user?.user?._id}
            className='flex flex-row gap-2 cursor-pointer'>
                <div className='flex flex-col justify-center'>
                    <img className='size-[70px] rounded-full border-2 border-slate-500'
                    src={user?.user.avatarUrl ? user.user.avatarUrl : ""} />
                </div>
                <div className='flex flex-col justify-center'>
                    <div className='flex gap-1'>
                        <h2 className='font-bold'>{user?.user?.displayName}</h2>
                        {user?.user?.username && <h2 className='font-semibold text-usernamecolor'>({user?.user?.username})</h2>}
                    </div>
                    <p className='text-sm text-usernamecolor'>Your personal account</p>
                </div>
            </Link>
            <div className='flex flex-col pl-2 mt-4'>
                <Link to={'../settings/profile'} 
                className={`flex items-center gap-2 hover:bg-usernamecolor px-2 rounded-md ${selectedSetting === 'profile' ? 'bg-usernamecolor' : ''}`}>
                    <div className='flex flex-col justify-center items-center'>
                        <IoPerson size={20}/>
                    </div>
                    <p className='text-lg'>Profile</p>
                </Link>
                <Link to={'../settings/socialMedia'}
                className={`flex items-center gap-2 hover:bg-usernamecolor px-2 rounded-md ${selectedSetting === 'socialMedia' ? 'bg-usernamecolor' : ''}`}>
                    <div className='flex flex-col justify-center items-center'>
                    <HiOutlineEnvelope size={20}/>
                    </div>
                    <p className='text-lg'>Social Media</p>
                </Link>
                <Link to={'../settings/changeAvatar'} 
                className={`flex items-center gap-2 hover:bg-usernamecolor px-2 rounded-md ${selectedSetting === 'changeAvatar' ? 'bg-usernamecolor' : ''}`}>
                    <div className='flex flex-col justify-center items-center'>
                    <HiOutlineEnvelope size={20}/>
                    </div>
                    <p className='text-lg'>Change Avatar</p>
                </Link>
            </div>
        </div>
    )
}

export default SettingSideBar