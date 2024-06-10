import React from 'react'

const BlogLoading = () => {
  return (
    <div className="flex flex-col gap-8 w-[900px]">
        <div className="skeleton h-[40px] w-[600px]"></div>
            <div className="flex gap-4 items-center">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
            </div>
            </div>
        <div className="skeleton h-[700px] w-full"></div>
    </div>
  )
}

export default BlogLoading