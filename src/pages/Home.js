import React from 'react'
import database from '../appwrite/database_service';
import { Post ,Container} from '../components';
import {useQuery} from 'react-query';

const Home = () => {
    

  const getPosts= async ()=>{
    const posts = await database.getPosts();
    console.log('Allposts', posts);
    return posts;
  }
  const {isLoading,isError,data,isFetching,error}=useQuery({queryKey:['Allposts'],queryFn:getPosts});

  const posts=data?.documents;

  
  
  
  if(!posts){
    return <Container>
    <div className='flex justify-center p-8 w-full  min-h-[580px]'>
    <p className='text-4xl mt-20 font-bold text-gray-800'>No posts to show OR login to show</p>
  </div>
  </Container> 
  }

if(isLoading){
  return   <Container>
  <div className='flex justify-center p-8 w-full  min-h-[580px]'>
  <p className='text-4xl mt-20 font-bold text-gray-800'>Loading.....</p>
</div>
</Container> 
}
if(isError){
  return   <Container>
  <div className='flex justify-center p-8 w-full  min-h-[580px]'>
  <p className='text-4xl mt-20 font-bold text-gray-800'>Something went wrong</p>
  <p>{error.message}</p>
</div>
</Container>
}

if(isFetching){
  return    <Container>
  <div className='flex justify-center p-8 w-full  min-h-[580px]'>
  <p className='text-4xl mt-20 font-bold text-gray-800'>Getting the posts....</p>
  </div>
</Container>
}
  


  return (
    
     <Container>
      
    <div className='flex flex-wrap p-2 gap-3 '>
        {posts?.map((post)=>
                    <div key={post.$id}>
                        <Post post={post} />
                    </div>
            )}
    </div>
      </Container>
            
  )

  
}

export default Home