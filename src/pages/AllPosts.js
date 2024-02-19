import React, { useEffect, useState } from 'react'
import { Post } from '../components'
import database from '../appwrite/database_service'
import { Query } from 'appwrite';
import { useSelector } from 'react-redux';
import {Container} from '../components';
import { Link } from 'react-router-dom';
const AllPosts = () => {
const id=useSelector(state=>state.auth.userData.$id);
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        database.getPosts([Query.equal('userId',id)]).then((posts)=>{
          if(posts){
            setPosts(posts.documents);
          }
        }).catch((e)=>console.log(e))
    },[id])

    if(posts.length <= 0){
      return <div className='text-center p-10'>

        <h1 className='text-4xl '>No posts to show Please Upload one..</h1>
        
        <div className='p-4 border text-2xl inline-block  bg-myGreen'>
          <Link to='/add-post'>Add Post</Link>
        </div>
      </div>
    }

  return (
    <Container>

    <div className='flex flex-wrap p-2  space-x-4'>
        {posts.map((post)=>
           <div  key={post.$id}>
              <Post post={post} />
           </div>
        )}
    </div>
        </Container>
  )
}

export default AllPosts