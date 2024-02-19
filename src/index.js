import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider} from 'react-redux';
import {Route,RouterProvider,
          createBrowserRouter,
          createRoutesFromElements} from 'react-router-dom';
import {QueryClient,QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools';

 import Login from './pages/Login'
 import EditPost from './pages/EditPost';
 import Home from './pages/Home';
 import Signup from './pages/Signup';
 import ShowSinglePost from './pages/Post';
 import AllPosts from './pages/AllPosts';
 import AddPost from './pages/AddPost';
import { ProtectedRoute } from './components';
import ErrorPage from './pages/ErrorPage';
const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:Infinity
    }
  }
});
const routes=createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' errorElement={<ErrorPage/>} element={<App/>}>
     <Route path='/' element={<Home/>} />
    <Route path='/login' element={<ProtectedRoute authentication={false}><Login/></ProtectedRoute>}  />
    <Route path='/signup' element={<ProtectedRoute authentication={false}><Signup /></ProtectedRoute>} />
    <Route path='/all-posts' element={ <ProtectedRoute authentication> <AllPosts /> </ProtectedRoute> } />
    <Route path='/add-post' element={<ProtectedRoute authentication><AddPost /></ProtectedRoute>} />
    <Route path='/edit-post/:id' element={<ProtectedRoute authentication><EditPost/></ProtectedRoute>} />
    <Route path='/post/:id' element={ <ShowSinglePost/>} />

  </Route>
  )
  )
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store} >
          <QueryClientProvider client={queryClient}>
          <RouterProvider  router={routes}/>
          <ReactQueryDevtools/>
          </QueryClientProvider>
        </Provider>
);

