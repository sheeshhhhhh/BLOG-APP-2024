import React, { useState } from 'react'
import formatDate from '../../utils/formatedate'

import { useAuthContext } from '../../Context/AuthContext'
import Follow from './Follow'
import toast from 'react-hot-toast'

const ProfileInfo = ({profile, setProfile}) => {
    const { user } = useAuthContext()
    const [isfollowing, setisfollowing] = useState(profile?.followers.includes(user?.user?._id))

    const istheowner = user?.user?._id === profile._id
    const properdate = formatDate(profile?.createdAt)
    const followingcount = profile?.following.length > 0 ? profile?.following.length : 0
    const followerscount = profile?.followers.length > 0 ? profile?.followers.length : 0
    const Blogscount = profile?.Blogs.length > 0 ? profile?.Blogs.length : 0

    const handleFollow = async (setLoading) => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/users/profile/follow", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    id: profile._id
                }),
                credentials: 'include'
            })

            const data = await res.json()

            if (data.error) throw new Error(data.error)

            // adding the user to the follower in the client state
            const followerscopy = profile
            followerscopy.followers.push(user?.user?._id)
            setProfile(followerscopy)
            setisfollowing(true)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleUnfollow = async (setLoading) => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/users/profile/unfollow", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    id: profile._id
                }),
                credentials: 'include'
            })

            const data = await res.json()

            if (data.error) throw new Error(data.error)
            
            // removing the user to the follower in the client state
            const profilecopy = profile
            // need to have a new variable because filter only creates new array not remove it from the variable it self
            // so we need a variable to store it
            const newfollower = profilecopy.followers.filter((follower) => { 
                return follower == user?.user?._id
            }) //removing my id
            profilecopy.followers = newfollower
            setProfile(profilecopy)
            setisfollowing(false)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='w-[350px] md:w-[400px] h-full flex flex-col gap-1 rounded-xl min-h-[400px] top-40'>
            <div className='h-[150px] flex flex-row gap-3 px-5 pt-2'>
                <div className='flex flex-col justify-center'>
                    <img className='size-[70px] rounded-full border-2 border-slate-500'
                    src={profile.avatarUrl ? profile.avatarUrl : ""} />
                </div>
                <div className='flex flex-col flex-1 text-start justify-center gap-1 pl-1'>
                    <div className='flex flex-row justify-start gap-2'>
                        <h2 className='font-bold text-xl'>{profile?.displayName}</h2>
                        {!istheowner && <Follow handleUnfollow={handleUnfollow}
                         handleFollow={handleFollow} isfollowing={isfollowing} />}
                    </div>
                    <p className='text-sm text-black'>{profile?.email}</p>
                    <h2 className='text-sm'>
                        <span className='font-semibold'>Member since: </span>
                        {properdate}
                    </h2>
                </div>
            </div>
            <div className='flex flex-1 flex-col'>
                <div className='flex flex-row justify-around px-3 '>
                    <p className='text-md font-bold w-[120px] h-[20px] '>followers: {followerscount}</p>
                    <p className='text-md font-bold w-[120px] h-[20px] '>following: {followingcount}</p>
                </div>
                <div className='px-[46px] pt-2'>
                    <h2 className='font-bold text-md'>Blogs: {Blogscount}</h2>
                </div>
                <div className='px-8 my-4'>
                    {profile?.Bio}
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo