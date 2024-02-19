import React,{ useState} from 'react';
import {useForm} from 'react-hook-form';
import {InputField,Container} from '../index';
import {Link} from 'react-router-dom'
import { ArrowRight,Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth_service';
import { useDispatch } from 'react-redux';
import { login } from '../../app/features/authSlice';

const Signup = () => {
   const dispatch=useDispatch();
   const [loading,setLoading]=useState(false);
   const navigate=useNavigate();
   const {register,handleSubmit ,formState:{
   errors
   }}=useForm();

  const createAccount=async(data)=>{
    setLoading(true)
      
    try {
      const userData=await authService.creatAccount(data);
      if(userData){
        const userdata=await authService.getCurrentUser()
        if(userdata) dispatch(login(userdata));
        setLoading(false);
        navigate('/');
      }  
      
    } catch (error) {
      setLoading(false)
      console.log(error);
      alert(error.message)
    } finally{
      setLoading(false)
    }
}

  

  return (
  <>
    <Container>
      
       <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl md:w-[300px]">Sign up</h2>
            
          <p className="mt-2 text-base text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>

        <form className="mt-8"  onSubmit={handleSubmit(createAccount)} >
        <div className="space-y-5">

           <InputField 
           {...register("name",{required:"name is required"})}
           type='text'
           label="Enter Full Name"
           placeholder="Full Name"
           autoComplete="on"
           errorMessage={errors.name?.message}
           />

           <InputField 
            {...register("email",{required:"email is required",
             pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address'}
             })}

           type='email'
           label="Enter Email"
           placeholder="Email"
           autoComplete="on"
           errorMessage={errors.email?.message}
           />

          <InputField 
           {...register("password",{required:"password is required",minLength:{
            value:8,
            message:"please enter 8 characters"
           }})}
           type='password'
           label=" Password"
           placeholder="Password"
           autoComplete="on"
           errorMessage={errors.password?.message}
           />
            
            <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account { loading ? <Loader2 className='ml-2 animate-spin'  size={16}/>: <ArrowRight className="ml-2" size={16} /> }
                  </button>
                
           </div>
           </form>
   
             </div>
             </div>

     
     </Container>
    </>
  )
}

export default Signup



      
       
            
             
                
                  
                    
                
                  
                  
                

                
              
