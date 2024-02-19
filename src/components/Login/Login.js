import React, { useState } from 'react'
import {InputField,Container} from '../index'
import { Link } from 'react-router-dom'
import {ArrowRight,Loader2}from 'lucide-react'
import { useForm } from 'react-hook-form'
import authService from '../../appwrite/auth_service'
import { useDispatch } from 'react-redux'
import {login as authLogin} from '../../app/features/authSlice'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [invalid,setInvalid]=useState(null);
  const [loading,setloading]=useState(false);
  const dispatch=useDispatch();
  const {register,handleSubmit,formState:{errors}} = useForm();
    const navigate=useNavigate()

    const login = async(data) => {
      setloading(true)
      try {
          const session = await authService.login(data)
          if (session) {
              const userData = await authService.getCurrentUser()
              if(userData) dispatch(authLogin(userData));
              navigate("/")
          }
      } catch (error) {
          setInvalid(error.message)
          setloading(false)
      }
  }


  return (
    <>
    <Container>
      
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
            
          <p className="mt-2 text-base text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign up
              </Link>
              
            </p>
          <p className='text-red-900'>{invalid}</p>
        <form  className="mt-8" onSubmit={handleSubmit(login)}>
        <div className="space-y-5">
           

           <InputField 
           {...register('email',{required:'email is required',
           pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address'}
          })}
           type='email'
           label="Email"
           placeholder="Email"
           autoComplete='on'
           errorMessage={errors.email?.message}
           />

          <InputField 
          {...register('password',{required:'password is required',minLength:{
            value:8,
            message:'please enter 8 characters'
          }})}
           type='password'
           label=" Password"
           placeholder="password"
           autoComplete="on"
           errorMessage={errors.password?.message}
           />
            
            <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Login  {loading ? <Loader2 className="ml-2 animate-spin" size={16}/> : <ArrowRight className="ml-2" size={16} /> }  
                  </button>
                
           </div>
           </form>
   
             </div>
            
       

     </div>
     </Container>
    </>
  )
}

export default Login