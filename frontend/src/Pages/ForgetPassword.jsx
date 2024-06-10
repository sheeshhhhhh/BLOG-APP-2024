import React, { useState } from 'react'
import toast from 'react-hot-toast'
import GetEmail from '../Components/ForgetPassword/GetEmail'
import GetCode from '../Components/ForgetPassword/GetCode'
import ChangePassword from '../Components/ForgetPassword/ChangePassword'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState()
    const [componentIdx, setComponentIdx] = useState(0)

    const sendCode = async () => {
        // responsible for getting the email and sending it to the backend so that they can create a non-Persistent code
        // and send it to email to get use later on
        try {
            const res = await fetch('http://localhost:5000/api/users/profile/forget-password' ,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({email: email}),
            })

            const data = await res.json()
            if(data.error) throw new Error(data.error)

            // redirect the user to the code page
            setComponentIdx(1)
        } catch (error) {
            toast.error(error.message) // toast for now but i want to show the error to the bottom of the input
        }
    }

    const verifyCode = async (code) => {
        // responsible for verifying if the code that is sent to the email is the right code
        try {
            const res = await fetch('http://localhost:5000/api/users/profile/verifycode', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    code: code,
                    email: email
                }),
            })

            const data = await res.json()
            if(data.error) throw new Error(error.data)
            setUsername(data)
            // if verified then procceed to change the password and also show the username
            setComponentIdx(2)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const resendCode = async (setCode) => {
    // if they didn't get the code then they have the option to resend it.
        try {
            const res = await fetch('http://localhost:5000/api/users/profile/resendcode' ,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({email: email}),
            })

            const data = await res.json()
            if(data.error) throw new Error(data.error)

            setCode('')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changePassword = async (password, confirmPassword) => {
        try {
            if (password !== confirmPassword) return toast.error("not the same password")

            const res = await fetch('http://localhost:5000/api/users/profile/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    email: email
                })
            })

            const data = await res.json()
            if(data.error) throw new Error(data.error)

            // redirect to login
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const componentrederer = () => {
        switch(componentIdx) {
            case 0:
                return <GetEmail email={email} setEmail={setEmail} sendCode={sendCode} />
            case 1: 
                return <GetCode email={email} verifyCode={verifyCode} resendCode={resendCode} />
            case 2: 
                return <ChangePassword username={username} changePassword={changePassword}/>
        }
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            {componentrederer()}
        </div>
    )
}

export default ForgetPassword