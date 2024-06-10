import React, { useState } from 'react'
import Googleauth from '../Components/Googleauth'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [signInfo, setSigninInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!signInfo.username || !signInfo.password || !signInfo.confirmPassword) return toast.error("please fill the required fields")

      if(signInfo.password !== signInfo.confirmPassword) return setErrorPassword(true)
      setErrorPassword(false)
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(signInfo),
        credentials: 'include'
      })

      const data = await res.json()

      if (data.error) throw new Error(data.error)

      if (data.message) return window.location.assign('http://localhost:5173'); // this will redirect the user because we already log him in the server
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-[400px] h-[450px] flex flex-col gap-3'>
        <h2 className='italic font-semibold text-2xl '>Sign up</h2>
        <form onSubmit={handleSignup}>
          <label id='usernamelabel' className='flex flex-col font-bold'>
            username
            <input 
            className='font-normal border border-gray-200 h-[35px] rounded-md px-2'
            aria-labelledby='usernamelabel'
            type='text'
            value={signInfo.username}
            onChange={(e) => setSigninInfo({...signInfo, username: e.target.value})}
            />
          </label>
          <label id='emaillabel' className='flex flex-col font-bold'>
            email (optional)
            <input 
            className='font-normal border border-gray-200 h-[35px] rounded-md px-2'
            aria-labelledby='emaillabel'
            type='text'
            value={signInfo.email}
            onChange={(e) => setSigninInfo({...signInfo, email: e.target.value})}
            />
          </label>
          <label id='passwordlabel' className='flex flex-col font-bold'>
            password
            <input 
              className={`font-normal border h-[35px] rounded-md px-2 ${errorPassword ? 'border-red-700 border-2' : 'border-gray-200'}`}
            aria-labelledby='passwordlabel'
            type='password'
            value={signInfo.password}
            onChange={(e) => setSigninInfo({...signInfo, password: e.target.value})}
            />
          </label>
          <div>
            <label id='confirmPasswordlabel' className='flex flex-col font-bold'>
              confirmPassword
              <input 
              className={`font-normal border h-[35px] rounded-md px-2 ${errorPassword ? 'border-red-700 border-2' : 'border-gray-200'}`}
              aria-labelledby='confirmPasslabel'
              type='password'
              value={signInfo.confirmPassword}
              onChange={(e) => setSigninInfo({...signInfo, confirmPassword: e.target.value})}
              />
            </label>
            {errorPassword && <h2 className='text-sm text-red-700 pl-2 font-bold'>password does not match!</h2>}
          </div>
          <h2 className='font-bold text-lg mt-2'>Already have an account? {""}
          <Link className='text-blue-500' to='/login' >Login</Link>
          </h2>
          <div className='flex justify-center mt-4'>
            <button 
            disabled={loading}
            type='submit'
            className='w-[250px] h-[40px] border border-slate-400 rounded-md hover:border-2 font-semibold'>
              {loading ? <span className='loading loading-dots'></span> :"Sign in"}
            </button>
          </div>
        </form>
        <div className='text-center divider mx-2'><span className='font-thin text-sm '>or with Google</span></div>
        <Googleauth/>
      </div>
    </div>
  )
}

export default SignUp