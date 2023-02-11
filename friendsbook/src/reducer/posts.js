import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const fetchAll = createAsyncThunk(
  "fetch/fetchall",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.fetchpost();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const createPost = createAsyncThunk(
  "create/createpost",
  async (post, thunkAPI) => {
    try {
      const { data } = await api.createPost(post);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const updatePost = createAsyncThunk(
  "upadate/updatePost",
  async ({ currentId, postdata }, thunkAPI) => {
    // console.log(currentId)
    // console.log(postData)
    try {
      const { data } = await api.updatePost(currentId, postdata);
      // console.log(data)
      return { data, currentId };
    } catch (err) {
      console.log(err);
    }
  }
);
export const deletePost = createAsyncThunk(
  "delete/deletePost",
  async (id, thunkAPI) => {
    // console.log("delete")
    try {
      const { data } = await api.deletePost(id);
      // console.log(data)
      return { data, id };
    } catch (err) {
      console.log(err);
    }
  }
);
export const likePost=createAsyncThunk(
    "like",async(id,thunkAPI)=>{
      try{
          // console.log("liked")
            const {data}= await api.likePost(id)
            return data
        }catch(err){
            console.log(err)
        }
    }
)
const postSlice = createSlice({
  name: "Posts",
  initialState: [],
  reducers: {
    create: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.fulfilled, (state, action) => {
        state = action.payload;
        return state
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(
        updatePost.fulfilled,
        (state, { payload: { currentId, data } }) => {
          return state.map((po) => (po._id === currentId ? data : po));
        }
      )
      .addCase(deletePost.fulfilled, (state, { payload: { id, data } }) => {
        // console.log(action.payload)
        state = state.filter((post) => post._id !== id);
        return state;
      })
      .addCase(likePost.fulfilled, (state,action)=>{
        state = state.map((post)=>post._id===action.payload._id?action.payload:post)
        return state
      })
     
  },
});

export const { create } = postSlice.actions;
export default postSlice.reducer;
