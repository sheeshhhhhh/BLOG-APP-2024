import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import ProfileInfo from '../Components/Profile/ProfileInfo'
import ProfileBlogs from '../Components/Profile/ProfileBlogs'

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getprofile = async () => {
            setLoading(true)
            try {
                const res = await fetch("http://localhost:5000/api/users/profile/" + id)

                const data = await res.json()

                if (data.error) return window.location.assign("http://localhost:5173/error")

                setProfile(data)
            } catch (error) {
                toast.error("Profile does not exist")
            } finally {
                setLoading(false)
            }
        }
        getprofile()
    }, [])

    if (loading) return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <span className='loading loading-spinner size-20'></span>
        </div>
    )
    
    return (
        <div className='h-full flex flex-col items-center'>
            <div className='flex flex-col gap-4 md:flex-row md:items-start items-center'>
                {profile ? <ProfileInfo profile={profile} setProfile={setProfile}/> : <span className='loading loading-spinner'></span>}
                <div className='divider divider-horizontal m-0'></div>
                {profile?.Blogs ? <ProfileBlogs profile={profile} /> : <span className='loading loading-spinner'></span>}
            </div>
        </div>
    ) 
}

export default Profile