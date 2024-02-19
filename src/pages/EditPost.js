import React,{useEffect,useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import database from '../appwrite/database_service';
import { AddPostForm } from '../components';

const EditPost = () => {
    const [post,setPost]=useState(null)
    const {id}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        if(id){
            database.getPost(id).then((res)=>{
              if(res)
              setPost(res)
            }
            ).catch((e)=>console.log(e))
        }else navigate('/')
    },[id,navigate])

  return  post ? <div>
    <AddPostForm  post={post}/>
  </div> :null

}

export default EditPost