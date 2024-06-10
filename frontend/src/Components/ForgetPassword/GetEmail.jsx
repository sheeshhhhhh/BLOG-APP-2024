import React from 'react'

const GetEmail = ({ email, setEmail, sendCode }) => {
  return (
    <div className='max-h-[400px] flex flex-col gap-3 p-3 w-full max-w-[400px]'>
        <div>
            <h1 className='font-bold text-xl mb-2'>Forget Password</h1>
            <p className='text-sm'>
                Only those account who has verified email can be recovered.<br />
                If you are verified please put in the email of your <br />
                account, we will send a code that you will need later on.
            </p>
        </div>
        <div className='flex justify-center'>   
            <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='h-[35px] w-[350px] font-normal border border-gray-200 rounded-md px-2'
            type='email'
            placeholder='Email'/>
        </div>
        <div className='flex justify-center'>
            <button 
            onClick={() => sendCode()}
            className='w-[250px] h-[40px] border border-slate-400 rounded-md hover:border-2 font-semibold'>
                Send Code
            </button>
        </div>
    </div>
  )
}

export default GetEmail