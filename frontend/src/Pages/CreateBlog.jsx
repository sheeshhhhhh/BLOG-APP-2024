import React, { useState } from 'react'
import toast from 'react-hot-toast';
import TextEditor from '../Components/TextEditor/TextEditor';
import { Navigate } from 'react-router-dom'

// responsible for creating blogs
// implement multer and others
const CreateBlog = () => {
    const [blogInfo, setBlogInfo] = useState({
        title: '',
        HashTag: '',
        description: '',
    })
    const [body, setBody] = useState('')
    const [file, setFile] = useState()
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState('')

    // responsible for handling files
    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setFile(file)
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setSelectedFile(e.target.result)
            }
            reader.readAsDataURL(file)
        }
    }
    
    const handleDrop = (event) => {
        event.preventDefault()
        const droppedfile = event.dataTransfer.files[0]
        setFile(droppedfile)
        if(droppedfile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                selectedFile(e.target.value)
            }
            reader.readAsDataURL(droppedfile)
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    // creating the blog 
    const handleCreateBlog = async (e) => {
        e.preventDefault()
        // create a backend rest api that handles this link that create blog
        // also check if multer work in the backend and frontend
        setLoading(true)
        try {
            if(!blogInfo.title || !body) return toast.error("fill in the title and body") 
            console.log(blogInfo.title)
            const formdata = new FormData()
            formdata.append('title',  blogInfo.title)
            formdata.append('HashTag', blogInfo.HashTag)
            formdata.append('description', blogInfo.description)
            formdata.append('HeaderPhoto', file)
            formdata.append('body', body)

            const res = await fetch("http://localhost:5000/api/blog/create", {
                method: 'POST',
                body: formdata,
                credentials: 'include'
            })

            const data = await res.json()

            if (data.error) throw new Error(data.error)
            
            setRedirect(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
        }
    }

    if(redirect) {
        return <Navigate to={`/Blog/${redirect}`} />
    }

    return (
        <div className='h-full flex justify-center p-4'>
            <form 
            onSubmit={handleCreateBlog}
            className='w-[80%] max-w-[950px] flex flex-col gap-4 sm:p-[5%]'>
                <div className=''>
                        <input
                        name='title'
                        value={blogInfo.title}
                        onChange={(e) => setBlogInfo({...blogInfo, title:e.target.value})}
                        placeholder='Title'
                        className='h-[40px] w-full pl-2' 
                        type="text" />
                </div>
                <div className=''>
                        <input
                        name='Hashtag'
                        value={blogInfo.HashTag}
                        onChange={(e) => setBlogInfo({...blogInfo, HashTag:e.target.value})}
                        placeholder='HashTag'
                        className='h-[40px] w-full pl-2 font-bold' 
                        type="text" />
                </div>
                <div className=''>
                        <input
                        name='description'
                        value={blogInfo.description}
                        onChange={(e) => setBlogInfo({...blogInfo, description:e.target.value})}
                        placeholder='description(optional)'
                        className='h-[40px] w-full pl-2 font-bold'
                        type="text" />
                </div>
                <div>
                    <label

                    onDrop={(event) => handleDrop(event)}
                    onDragOver={(event) => handleDragOver(event)}
                    className=''
                    >
                        {selectedFile ? <img src={selectedFile} style={{ maxWidth: '100%', maxHeight: '200px' }} /> : "Choose File"}
                        <input
                        name='HeaderPhoto'
                        hidden
                        onChange={(e) => handleFileChange(e)}
                        type='file' />
                    </label>
                </div>
                <div className=''>
                        <TextEditor 
                        text={body} setText={setBody} />
                </div>
                <div className='flex justify-center w-full'>
                    <button type='submit'
                    className='btn sm:w-full max-w-[400px]'>{loading ? (
                        <h2>Creating
                            <span className='loading loading-dots loading-xs'></span>
                        </h2>
                    ) : "Create Blog"}</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBlog