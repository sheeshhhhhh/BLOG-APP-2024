import React, { memo } from 'react'
import { redirect } from 'react-router-dom'

const Googleauth = () => {

    const handleGoogleauthOnclick = () => {
        window.location.assign('http://localhost:5000/api/auth/google');
    }
    
    return (
        <div  className='flex flex-row justify-center'>
            <button 
            onClick={() => handleGoogleauthOnclick()}
            className='w-[250px] h-[40px] border border-slate-400 rounded-md flex justify-center items-center cursor-pointer hover:border-2'>
                <img 
                src='/googleicon.png' 
                alt='google Icon'
                className='h-5 sm:h-8'
                />
                <h1 className='font-semibold'>Google</h1>
            </button>
        </div>
    )
}

export default memo(Googleauth)