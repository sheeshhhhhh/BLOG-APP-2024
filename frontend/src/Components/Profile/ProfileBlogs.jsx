import React from 'react'
import Blog from './Blog'

const ProfileBlogs = ({profile}) => {
    
    return (
        <div className='h-full min-h-[500px] w-[750px] py-[50px] px-[20px]'>
            {profile?.Blogs.length >= 0 ?  (
                <div className='flex flex-col gap-4'>
                    <h2 className='ml-4 font-bold text-3xl'>Blogs</h2>
                    <span className='divider m-0'></span>
                    {profile?.Blogs.map((Blogs) => {
                        return (
                            <Blog Blog={Blogs} profile={profile} />
                        )
                    })}
                </div>
            ) : 
            (
                <div className='h-full max-h-[400px] w-[550px] flex flex-1 justify-center items-center'>
                    <p className='font-bold text-2xl text-slate-600'>
                        This user has not publish any Blogs
                    </p>
                </div>
            )}
        </div>
  )
}

export default ProfileBlogs