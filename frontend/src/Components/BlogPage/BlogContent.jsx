import React from 'react'

const BlogContent = ({body}) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html:body}}>
      </div>
    </div>
  )
}

export default BlogContent