import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Googleauth from '../Components/Googleauth'
import toast from 'react-hot-toast'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [logininfo, setLogininfo] = useState({
    username: '',
    password: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!logininfo.username || !logininfo.password) return toast.error("please fill all the fields")
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(logininfo),
        credentials: 'include'
      })

      const data = await res.json()
      if (data.message) return window.location.assign('http://localhost:5173');
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='w-[400px] p-8 flex flex-col gap-3'>
        <h2 className='italic font-semibold text-2xl '>Login</h2>
        <form onSubmit={handleLogin}>
          <div className='flex flex-col gap-2 mb-1'>
            <label id='usernamelabel' className='flex flex-col font-bold'>
              username
              <input 
              className='font-normal border border-gray-200 h-[35px] rounded-md px-2'
              aria-labelledby='usernamelabel'
              type='text'
              value={logininfo.username}
              onChange={(e) => setLogininfo({...logininfo, username: e.target.value})}
              />
            </label>
            <label id='passwordlabel' className='flex flex-col font-bold'>
              Password
              <input 
              className='font-normal border border-gray-200 h-[35px] rounded-md px-2'
              aria-labelledby='passwordlabel'
              type='text'
              value={logininfo.password}
              onChange={(e) => setLogininfo({...logininfo, password: e.target.value})}
              />
            </label>
            <Link className=' text-blue-500 font-semibold text-sm hover:underline'
            to={'/forgetpassword'}
            >Forget Password?</Link>
          </div>
          <h2 className='font-bold text-lg'>Don't have an account? {""}
          <Link className='text-blue-500'
          to='/signup' >Sign Up</Link></h2>
          <div className='flex justify-center mt-4'>
            <button 
            disabled={loading}
            type='submit'
            className='w-[250px] h-[40px] border border-slate-400 rounded-md hover:border-2 font-semibold'>
              {loading ? <span className='loading loading-spinner'></span> : "Log in"}
              </button>
          </div>
        </form> 
        <div className='text-center divider'><span className='font-thin text-sm '>or with Google</span></div>
        <Googleauth />
      </div>
    </div>
  )
}



export default Login