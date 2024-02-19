import './App.css';
import { Header,Footer } from './components';
import {Outlet} from 'react-router-dom';
import authService from './appwrite/auth_service'
import {login,logout} from './app/features/authSlice'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch=useDispatch()
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
     authService.getCurrentUser()
     .then((res)=>{
      if(res){
        dispatch(login(res));
      } 
      else {
        dispatch(logout());
      }
      
     }).catch((e)=>console.log(e))
     .finally(()=>{
       setLoading(false)
     })
  },[])
      
  return !loading ? (
    <>
    <Header/>
      <div className='w-full bg-myWhite min-h-[580px]'>
           <Outlet/>
      </div>
    <Footer/>
    </>
  ):null
}

export default App;
