import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const DropComment = ({ blogid, user, blog, setBlog }) => {
    const [activeComment, setActiveComment] = useState(false)
    const [commentBody, setCommentBody] = useState('')

    const dropacomment = async (e) => {
        try {
            // implement a way to add to the current comment
            // so that we don't need to restart to see comment when we successfully commented
            e.preventDefault()
    
            if (!commentBody) return toast.error("please fill in the fields")
    
            const res = await fetch(`http://localhost:5000/api/blog/comment/${blogid}`, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    type: 'parent',
                    body: commentBody
                }),
                credentials: 'include'
            })
    
            const data = await res.json()
    
            if(data.error) throw new Error(error.data)

            // we are creating a comment like data to pass so that we can update usestate that contains other comments
            // this is so that we can update comment after it was successful and don't need to ask data base for another comments
            Addcomment({
                _id: data.newComment._id,
                type: data.newComment.type,
                User: data.User,
                body: data.newComment.body,
                childComments: data.newComment.childComments
            })

            setCommentBody('')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const divRef = useRef(null);

    const handlesetCommentBody = (event) => {
        setCommentBody(event.target.textContent);
        // just get from chat gpt
        // Move the cursor to the end of the content
        const selection = window.getSelection();
        if (selection) {
          const range = document.createRange();
          range.selectNodeContents(divRef.current);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
    };

    const handleCancel = () => {
        setCommentBody('')
        setActiveComment(false)
    }

    const Addcomment = (data) => {
        console.log(data)
        // this is responsible for adding the comment to the usestate
        setBlog(prevblog => ({
            ...prevblog,
            Comments: [...prevblog.Comments, data]
        }))
    }
    
    return (
        <div className='max-w-[900px] mb-4 flex flex-row gap-3 px-2'>
                <div className='size-10 rounded-full'>
                    <img className='size-10 rounded-full'
                    src={user?.avatarUrl ? user?.avatarUrl : ''}></img>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                    <div
                    // aria-label={'Make a Comment...'}
                    onInput={handlesetCommentBody}
                    suppressContentEditableWarning={true}
                    ref={divRef}
                    contentEditable={true}
                    onFocus={() => setActiveComment(true)}
                    className='text-sm md:text-lg w-full max-w-[900px] outline-none 
                    border-b-[1px] focus:border-b-[2px] border-black px-1'>
                        {commentBody}
                    </div>
                    {activeComment ? (
                        <form onSubmit={dropacomment}>
                        <div className='flex gap-2 p-2 justify-end'>
                            <button 
                            className='btn rounded-full px-5 text-md h-[30px] min-h-0'
                            onClick={() => handleCancel()}
                            >Cancel
                            </button>
                            <button
                            disabled={!commentBody}
                            className={`btn rounded-full px-5 text-md h-[30px] min-h-0  
                            ${commentBody ?'bg-blue-700 hover:bg-blue-800 text-white' : ''}`}
                            type='submit'
                            >Comment
                            </button>
                        </div>
                        </form>
                    ) : null}
                </div>
        </div>
    )
}

export default DropComment