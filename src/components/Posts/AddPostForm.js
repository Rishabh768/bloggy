import React, { useCallback, useEffect, useState } from 'react'
import {InputField, RTE,Container} from '../index'
import {useForm} from 'react-hook-form'
import database from '../../appwrite/database_service'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddPostForm = ({post}) => {
     const [loading,setLoading]=useState(false);
    const {register,handleSubmit,setValue,getValues,watch,control}=useForm({
        defaultValues:{
            title:post?.title || '',
            content:post?.content || '',
            slug:post?.slug || '',
            status:post?.status || 'active'
        }
    });
    const userData=useSelector(state=>state.auth.userData);
    const navigate=useNavigate();
      
    const slugGenerate=useCallback((value)=>{
      if(value && typeof value == 'string')
      return value.trim().toLowerCase().replace(/[\s]/g,'-')
      return ''
    })
    useEffect(()=>{
         const subscription=watch((value,{name})=>{
          if(name==='title'){
            setValue('slug',slugGenerate(value.title))
          }
         })

         return ()=>{
          subscription.unsubscribe()
         }
    },[watch,setValue,slugGenerate])
    


     const submit=async(data)=>{
        setLoading(true)
        if(post){
                console.log('updating the post');
            const image=data.image[0];
            console.log(image)
            const file =  image ? await database.uploadFile(image) : null
             
            if(file){
              console.log('got the file and deleting the previous image')
               await database.deleteFile(post.image_id);
                const updatedPost =  await database.updatePost(post.$id,{...data,image_id:file.$id})
                setLoading(false)
                navigate(`/posts/${updatedPost.$id}`) 
            }
        }else{
            //creating new Post
            console.log('creating the post')
            if(userData.$id){

           const image=data.image[0];
           console.log(data)
           console.log(image)
           const file=  image ? await database.uploadFile(image) : undefined;
    
           if(file){
              const newPost=await database.createPost({...data,userId:userData.$id,image_id:file.$id});
              setLoading(false)
              navigate(`/post/${newPost.$id}`)
           }
        }
      }

    }
    



  return (
    <Container>
    
   <form onSubmit={handleSubmit(submit)}>
      <div className='grid md:grid-cols-2 gap-2 p-4'>
      
      <div>

      <InputField 
        label='Title'
        {...register("title",{required:true})}
        />
         
         
      <InputField 
        label='Slug'
        onInput={e=>slugGenerate(e.target.value)}
        {...register("slug",{required:true})}
        
        />

        <RTE  control={control} label='content' defaultvalue={getValues('content')}/>

        </div>


 <div>
     <InputField 
        label='Upload Image'
        {...register('image',{required:true})}
        type='file'
      
        />
        
        <button type='submit' disabled={loading} className='mt-4 mb-4 px-2 text-lg bg-gray-600  text-white rounded-md'>Add post</button>
        </div>


          </div>
        </form>

    
    </Container>
  )
}

export default AddPostForm