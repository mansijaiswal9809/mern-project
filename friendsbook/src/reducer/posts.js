import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api'

export const fetchAll=createAsyncThunk(
'fetch/fetchall',async(_,thunkAPI)=>{
    try{
        const {data}= await api.fetchpost()
        return data
    }catch(err){
        console.log(err)
    }
}
)
export const createPost=createAsyncThunk(
"create/createpost", async(post,thunkAPI)=>{
    try{
        const {data}= await api.createPost(post)
        return data
    }catch(err){
        console.log(err)
    }
}
)
const postSlice= createSlice({
    name: "Posts",
    initialState:[],
    reducers:{
        create:(state)=>{
            return state
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAll.fulfilled,(state,action)=>{
            state=action.payload
        })
        .addCase(createPost.fulfilled,(state,action)=>{
            state.push(action.payload)
        })
    }
})

export const {create}= postSlice.actions
export default postSlice.reducer