import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

const TextEditor = ({ text, setText}) => {

    return (
        <div className='min-h-[300px]'>
            <ReactQuill
            className='min-h-[300px] max-h-none'
            modules={modules} formats={formats}
            value={text}  
            onChange={(event) => setText(event)}
            />
        </div>
    )
}

export default TextEditor