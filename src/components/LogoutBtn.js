import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../app/features/authSlice';
import authService from '../appwrite/auth_service';

const LogoutBtn = () => {

 const dispatch=useDispatch();

 const handleLogout=()=>{
   authService.logout().then
   (()=>dispatch(logout()))
   
}

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default LogoutBtn