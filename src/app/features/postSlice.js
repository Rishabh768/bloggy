import {createSlice} from '@reduxjs/toolkit'

const initialState={
     posts:[]
}
const postSlice=createSlice({
    name:'posts',
    initialState,
    reducers:{
        addPost:(state,action)=>{
            state.posts.push(action.payload)
        },
        getPosts:(state,action)=>{
            state.posts=action.payload
        }
    }
})
export const {addPost,getPosts} = postSlice.actions;
export default postSlice.reducer