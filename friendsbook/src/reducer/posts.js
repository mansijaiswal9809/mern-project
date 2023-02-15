import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getPosts = createAsyncThunk(
  "fetch/fetchall",
  async (page, thunkAPI) => {
    // console.log(page)
    try {
      const { data } = await api.fetchPosts(page);
      // console.log(data)
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const createPost = async (post) => {
  try {
    const { data } = await api.createPost(post);
    console.log(data.message);
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = async ( currentId, postdata ) => {
  // console.log(currentId)
  // console.log(postData)
  try {
    const { data } = await api.updatePost(currentId, postdata);
    // console.log(data.msg);
  } catch (err) {
    console.log(err);
  }
};

export const getPostsBySearch = createAsyncThunk(
  "searchpost/fetchbysearch",
  async (searchQuery, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await api.fetchPostsBySearch(searchQuery);
      // console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deletePost = async (id) => {
  try {
    const { data } = await api.deletePost(id);
    console.log(data.message);
  } catch (err) {
    console.log(err);
  }
};

export const likePost = createAsyncThunk("like", async (id, thunkAPI) => {
  try {
    // console.log("liked")
    const { data } = await api.likePost(id);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const commentPost = createAsyncThunk(
  "comment",
  async (value, thunkAPI) => {
    // console.log(value)
    try {
      const { data } = await api.comment(value);
      // console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteComment= createAsyncThunk(
  'deleteComment', async({postId,userId})=>{
    try {
      const {data}= await api.deleteComment(postId,userId)
      // console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)
export const getPost = createAsyncThunk(
  "getPost/getSinglePost",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.fetchPost(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  posts: [],
  currentPage: 1,
  numberOfPages: 0,
  post: {},
};
const postSlice = createSlice({
  name: "Posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(
        getPosts.fulfilled,
        (state, { payload: { data, numberOfPages, currentPage } }) => {
          state.posts = data;
          state.numberOfPages = numberOfPages;
          state.currentPage=currentPage
          return state;
        }
      )
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        return state;
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.posts = action.payload;
        return state;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload;
        return state;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        let updatedpost = state.posts.find(
          (item) => item._id === action.payload._id
        );
        updatedpost = action.payload;
        return state;
      })
      .addCase(deleteComment.fulfilled,(state,action)=>{
        let updatedpost = state.posts.find(
          (item) => item._id === action.payload._id
        );
        updatedpost = action.payload;
        return state;
      })
  },
});

export default postSlice.reducer;
