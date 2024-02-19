import React from 'react'
import database from '../../appwrite/database_service'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
const Post = ({post}) => {

  const postTitle=post.title.length > 30 ? post.title.substr(0,30)+'...' : post.title
  const postDescription=post.content.length > 150 ? post.content.substr(0,150) + '...' : post.content
  return (
    <Link to={`/post/${post.$id}`}>
     <div className="w-[390px] rounded-md border bg-white">
      <img 
        className="h-[250px] w-full rounded-t-md object-cover"
        src={database.getFilePreview(post.image_id)}
        alt={post.title}
      />

       <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {postTitle} &nbsp; 
        </h1>

        <div>  
              {parse(postDescription)}
        </div>

      </div>
    </div>
    </Link>
 
  )
  

   
}

export default Post