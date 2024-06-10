import React, { useState } from 'react'

const ChangePassword = ({username, changePassword}) => {
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    return (
        <div className='max-h-[400px] flex flex-col gap-3 p-3 w-full max-w-[400px]'>
            <div>
                <h1 className='text-xl font-bold mb-2'>Change Password</h1>
                <p className='text-sm'>This is your username you will need this on login!</p>
                <p>username: {username}</p>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <input
                className='h-[35px] w-[350px] font-normal border border-gray-200 rounded-md px-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                />
                <input
                className='h-[35px] w-[350px] font-normal border border-gray-200 rounded-md px-2'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='confirm password'
                />
            </div>
            <div className='flex justify-center'>
                <button
                className='w-[250px] h-[40px] border border-slate-400 rounded-md hover:border-2 font-semibold'
                onClick={() => changePassword(password, confirmPassword)}
                >
                    Change Password
                </button>
            </div>
        </div>
    )
}

export default ChangePassword