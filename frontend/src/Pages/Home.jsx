import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Home = () => {
  const [images, setImages] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getbgimage = async() => {
      setLoading(true)
      try {
        const res = await fetch('http://localhost:5000/gethomeimages')
        const data = await res.json()
        setImages(data)
      } catch (error) {
        toast.error('error in getting the images')
      } finally {
        setLoading(false)
      }
    }
    getbgimage()
  }, [])

  //this is used to have normal css styling because it is hard to style and connect images in tailwind css
  const backgroundstyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url('http://localhost:5000/Homeuploads/${images}')`
  }

  if (loading) return null

  return (
    <div className='h-screen'>
      <div style={backgroundstyle}
      className={`z-[-1]
      h-full flex flex-row gap-4 justify-around items-center relative`}>
        <div className='flex flex-col gap-3 p-3 mb-[200px]'>
          <h2 className='font-bold text-5xl'>Blog Ph</h2>
          <p className='text-lg font-semibold'>
            A website made so that people can share their experiences in the philippines <br/>
            and Help others or you just want to write your experience
          </p>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Home