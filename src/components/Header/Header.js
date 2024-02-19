import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom';
import {Container,LogoutBtn} from '../index'
import Logo from '../../assets/vector/default-monochrome-white.svg'
const Header = () => {

    const navigate=useNavigate();
    const userStatus=useSelector(state=>state.auth.userStatus);

    const navItems=[
        {
            name:'Home',
            path:'/',
            active:true
        },
        {
            name:'Login',
            path:'/login',
            active:!userStatus
        },
        {
            name:'Sign Up',
            path:'/signup',
            active:!userStatus
        },
        {
            name:'All posts',
            path:'/all-posts',
            active:userStatus
        },
        {
            name:'Add post',
            path:'/add-post',
            active:userStatus
        }
    
    ]
  return (
    <header className='bg-myGreen p-4 text-white'>    
        <Container>   
              <nav className='flex items-center  w-full'>
                <div className='flex-grow'><Link className='text-2xl' to='/'>
                    <img className='h-8' src={Logo} alt='logo'></img></Link>
                    </div>
                
                <ul className='flex space-x-4'>
                    {navItems.map((nav)=>nav.active ? <li key={nav.name}>
                        <button onClick={()=>navigate(nav.path)}>{nav.name}</button>
                        </li>:null
                        )}
                        <li>{userStatus ? <LogoutBtn/> : null}</li>
                </ul>
               </nav>
            </Container> 
    </header>
  )
}

export default Header