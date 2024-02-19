import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children , authentication=true}) => {

    const authStatus=useSelector(state=>state.auth.userStatus);
    const navigate=useNavigate();
    const [loader,setLoader]=useState(true)

    
    useEffect(()=>{

    if(authentication && authStatus !== authentication){
        navigate('/login')
    }else if(!authentication && authStatus !== authentication ){
        navigate('/')
    }
     setLoader(false)
      },[authStatus,navigate,authentication]);

    return  loader ? <h1>Loading..</h1> : <div> {children} </div>
}

export default ProtectedRoute