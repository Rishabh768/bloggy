import React, { useCallback, useEffect,useState } from 'react'
import database from '../appwrite/database_service'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'html-react-parser'
function ShowSinglePost() {

     const { id }=useParams();
    
     const [post,setPost]=useState(null)
     const navigate=useNavigate();
     const userData=useSelector((state=>state.auth.userData));
     const isAuthor= post && userData ? post.userId === userData.$id : false;

   const  getPost=useCallback(async()=>{
    if(id){
      try {
      const post=await database.getPost(id);
      setPost(post)

      } catch (error) {
      console.log(error)
      }
    }
  },[id])

  const handleEdit=()=>{
      navigate(`/edit-post/${post.$id}`)
  }
    useEffect(()=>{
     
      getPost()

  },[getPost]);

  if (post){

    return (
      
        <div >
        <div className='w-[60%] mx-auto bg-white p-4'>
        <div className='flex justify-between '>
          <h1 className='text-2xl mt-8 mb-4 flex1 w-full text-center font-semibold'>{post.title} </h1>
          <div>
          {isAuthor && <div className=' text-white'>
            <div className='flex p-4 space-x-5'>
             <button className=' px-3 bg-gray-400 rounded-sm '
              onClick={handleEdit}>Edit</button>
             <button className='bg-[#DC3545] px-3 rounded-sm '
              onClick={()=>{
              database.deletePost(id,post.image_id);
               navigate('/')
               }}>Delete</button> 
               </div>
            </div> }
          </div>
        </div>
        
        <div>

        <div className=' overflow-hidden rounded-xl'>
        <img 
        className='max-h-[500px] w-full'
        src={database.getFilePreview(post.image_id)} 
        alt={post.$id} />
        </div>

        <div className='py-10'> 
           <div className='text-xl'>{ReactHtmlParser(post.content) || "No content Avaliable"}</div>
        </div>
       
        </div>
          
    
  </div>
  </div>
  )
}else {
  <p>loading..</p>
}
}

export default ShowSinglePost