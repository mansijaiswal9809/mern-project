import React from 'react'
import Post from './post/Post'
import { useSelector } from 'react-redux'

const Posts = () => {
    const posts= useSelector((store)=>store.posts)
    console.log(posts)
  return (
    <div>
      posts
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </div>
  )
}

export default Posts
