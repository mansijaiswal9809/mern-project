import axios from "axios";
import jwt_decode from "jwt-decode";
// const url = "http://localhost:5000/posts";
const API = axios.create({ baseURL: " http://localhost:5000" });
API.interceptors.request.use((req)=>{
  if(localStorage.getItem("profile")){
    req.headers.authorization= `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
  }
  return req
})
export const fetchpost = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likepost`);
export const signin=(formData)=>API.post("/user/signin", formData)
export const signup=(formData)=>API.post("/user/signup ", formData)

