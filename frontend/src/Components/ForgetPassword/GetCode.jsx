import React, { useState } from 'react'

const GetCode = ({ email, verifyCode, resendCode}) => {
    const [code, setCode] = useState()
    

    return (
        <div className='max-h-[400px] flex flex-col gap-3 p-3 w-full max-w-[400px]'>
            <div>
                <h1 className='font-bold text-xl mb-2'>Verify Code</h1>
                <p className='mb-1 text-sm'>
                    We send a code to the email that you provided <br/>
                    please look on it and input the code here. 
                </p>
                <p className='font-semibold'>Email: {email}</p>
            </div> 
            <div className='flex justify-center'>
                <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className='h-[35px] w-[350px] font-normal border border-gray-200 rounded-md px-2'
                placeholder='Code'
                />
            </div>
            <div className='flex justify-around'>
                <button className='w-[150px] h-[40px] border border-slate-400 rounded-md hover:border-2 font-semibold'
                onClick={() => verifyCode(code)}
                >Verify Code</button>
                <button className='w-[150px] h-[40px] border border-slate-400 rounded-md hover:border-2 font-semibold'
                onClick={() => resendCode(setCode)} 
                >Resend Code</button>
            </div>
        </div>
  )
}

export default GetCode